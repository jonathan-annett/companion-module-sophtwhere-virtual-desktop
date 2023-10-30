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

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config, isFirstInit) {
		const self = this;

		console.log({init:{isFirstInit,config}});

		virtualDesktop.startManager ().then(function(api){

			self.api = api;
			
			self.updateVariableDefinitions(); // export variable definitions
			['resetVariable', 'resetVariables', 'getVariable', 'setVariable', 'vars'].forEach(function (method) {
				const fn = UpdateVariableDefinitions[method];
				api[method] = fn;
			});

			self.updateActions().then (function(){
				self.updatePresets();// export presets
			}); // export actions
			
			self.updateFeedbacks(); // export feedbacks

			api.setVariableValues = function (vars) {
				const vars2 = {};
				Object.keys(vars).forEach(function (k) {
					const val = vars[k];
					if (val !== undefined) {
						vars2[k] = val;
						if (k === "remain" || k === "elapsed") {
							const extra = splitHMS(val);
							Object.keys(extra).forEach(function (kk) {
								vars2[`${k}_${kk}`] = extra[kk];
							});
						}
					}
				});
				self.setVariableValues(vars2);
				self.checkFeedbacks();
			};


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
		this.config = config;
	}


	 

	// Return config fields for web config
	getConfigFields() {
		const config = this.config;

		return [

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
