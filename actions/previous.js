const { combineRgb } = require('@companion-module/base');
const actionDef =  {

	previous : {
		name: 'Previous Desktop',
		options:  [
			
		],
		callback: async (event) => {

			actionDef.api.previous().then(function(info){
				actionDef.api.setVariableValues({visible : info.name,visibleIndex :info.index });
			});
		},
	},

	

	presets : {

		prev :  {
			category: 'Desktop',
            "type": "button",
            "style": {
                "text": "prev",
                "size": "14",
                "png": null,
                "alignment": "center:center",
                "pngalignment": "center:center",
                "color": 0,
                "bgcolor": 0,
                "show_topbar": false,
                "png64": "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"
            },
            "options": {
                "relativeDelay": false,
                "stepAutoProgress": true
            },
			steps: [
				{
					down: [
						{
							actionId: 'previous',
							options: {
								 
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				
			],
        }

	}

};

module.exports = function (self) {
	actionDef.api = self.api;
	return actionDef;
};

