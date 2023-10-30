/*!
 * companion-module-sophtwhere-timer/actions/index.js
 * Copyright(c) 2023 Jonathan Annett
 * MIT Licensed
 */

module.exports = function (self) {

	return new Promise(function(resolve){
		const api = self.api;
		
		const acts = {
		};

		[
			'goto',
			'next',
			'previous'

		].forEach(function(x){ acts[x]=require(`./${x}`)(self);});

		const actionDefs = {

			goto       : acts.goto.goto,
			previous   : acts.previous.previous,
			next       : acts.next.next,
		
		};
		
		
		api.actions = acts;
		api.actionDefs = actionDefs;

		api.presets = {};
		const ready= [];

		Object.keys(api.actions).forEach(function(libName){
			const lib = api.actions[libName];
			if (lib.ready) ready.push(lib.ready);
		});

		Promise.all(ready).then(function(xxx){

			Object.keys(api.actions).forEach(function(libName){
				const lib = api.actions[libName];					 
				if (lib && lib.presets) {
					Object.keys(lib.presets).forEach(function(presetKey){
						if (!!lib.presets[presetKey]) {
							const ps =  lib.presets[presetKey];
							api.presets[presetKey] = ps;
							
						} else {
							console.log('warning:',presetKey,'is already defined, in',libName);
						}
					});			
				}
			});

			self.setActionDefinitions(actionDefs);

			resolve();
		});

	
	});
	 
}
