const { combineRgb } = require('@companion-module/base');
const actionDef =  {

	switch : {
		name: 'Switch Desktops',
		options:  [
			{
				id: 'index',
				type: 'number',
				label: 'Desktop Index',
				default: 0,
				min: 0,
				max: 10
			}
		],
		callback: async (event) => {
			actionDef.api.switch(event.options.index);
		},
	},

	presets : {

		

	}

};

module.exports = function (self) {
	actionDef.api = self.api;
	actionDef.options[0].max = self.getVariableValue('count') || 10;
	return actionDef;
};

