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

		if ( virtualDesktop.CSharpOk()) {
			virtualDesktop ().then(function(api){
				self.api = api;
				self.updateStatus(InstanceStatus.Ok);
			}).catch(function(){
				self.updateStatus(InstanceStatus.BadConfig);
			});
		} else {
			self.updateStatus(InstanceStatus.BadConfig);
		}



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
		UpdateActions(this);
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
