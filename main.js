/*!
 * companion-module-sophtwhere-timer/main.js
 * Copyright(c) 2023 Jonathan Annett
 * MIT Licensed
 */

const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades');
const UpdateActions = require('./actions');
const UpdatePresets = require('./presets');
const UpdateFeedbacks = require('./feedbacks');
const UpdateVariableDefinitions = require('./variables');
const virtualDesktop = require ("virtual-desktop-node");

const os = require('os');
const path = require('path');
const fs = require('fs');

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config, isFirstInit) {
		const self = this;

		console.log({init:{isFirstInit,config}});

		virtualDesktop.startManager ( isFirstInit ? undefined: config.vd_api_version ).then(function(api){

			config.vd_api_version = virtualDesktop.selectedClient;

			self.api = api;
			
			self.updateVariableDefinitions(); // export variable definitions
			['resetVariable', 'resetVariables', 'getVariable', 'setVariable', 'vars'].forEach(function (method) {
				const fn = UpdateVariableDefinitions[method];
				api[method] = fn;
			});

			api.on('variable',UpdateVariableDefinitions.setVariable);

			api.current().then(function(info){
				console.log({info});
			}).catch(console.log.bind(console));

			self.updateActions().then (function(){
				self.updatePresets();// export presets
			}); // export actions
			
			self.updateFeedbacks(); // export feedbacks

			self.updateStatus(InstanceStatus.Ok);

			
		}).catch(function(err){
			console.log(err);
			self.updateStatus(InstanceStatus.BadConfig);
		});
		


	}

 

	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy');		 
	}

	async configUpdated(config) {
		const self = this;
		this.config = config;

		if (config.vd_api_version ) {
			const ix = virtualDesktop.clientNames.indexOf( config.vd_api_version ) ;
			if (ix>=0) {
				const candidatePath = virtualDesktop.clientExePaths[ix];
				fs.stat(candidatePath,function(err,stat){
					if (stat) {
						virtualDesktop.testVersionCandidate(candidatePath)
						   .then(function () {
						     	console.log("tested version:",config.vd_api_version,"ok");
						   })
						   .catch(function (err) {
								console.log("error testing version:",err);

								virtualDesktop.detectClient().then(function(p){

									console.log("detected:",p);

									const ix = virtualDesktop.clientExePaths.indexOf( p ) ;

									if (ix>=0) {
										console.log("located index:",ix);

										config.vd_api_version =  virtualDesktop.clientNames[ix];
										self.config=config;
										self.saveConfig();
									}

								});
						   });
					}
				});
			}
		}

		  

	}


	 

	// Return config fields for web config
	getConfigFields() {
		const config = this.config;
		
		let defaultVer = config ? config.vd_api_version : undefined;
		const versions = virtualDesktop.clientNames.map(function(verString,ix){
			const verPath   = virtualDesktop.clientExePaths[ix];
			if (!defaultVer || (virtualDesktop.selectedClient === verString)) {
				defaultVer = verString;
				if (config) {
					config.vd_api_version=defaultVer;
				}
			}
			return { id: verString, label : verString};
		});

		return [
			{
				type: 'dropdown',
				label: 'API Version',
				id: 'vd_api_version',
				default: defaultVer,
				choices: versions
			  }
		];

	}

	updateActions() {
		return UpdateActions(this);
	}

	updatePresets() {
		UpdatePresets(this);
	}

	updateFeedbacks() {
		UpdateFeedbacks(this);
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this);
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts);
