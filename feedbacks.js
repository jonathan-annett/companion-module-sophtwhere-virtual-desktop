const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	 
	self.setFeedbackDefinitions({

		

	 	
	});

		
	function booleanFeedback (name,bgcolor,color,offText,onText,varName,func) {
		const def = {};
		const nameLower = name.toLowerCase();
		const FeedbackName = name.charAt(0).toUpperCase()+nameLower.substring(1); 
		const optionStateName =  nameLower+'Status';
		varName = varName || nameLower;

		return {
			name : nameLower,

			type: 'boolean',

			defaultStyle: {
				bgcolor: bgcolor,
				color: color
			},

			options: [
				{
					type: 'dropdown',
					label: 'Which Status?',
					id:optionStateName,
					default: '1',
					choices: [
						{ id: '0', label: offText },
						{ id: '1', label: onText },
					],
				}
			],
			callback: func || function (feedback) {
				return ( self.getVariableValue(varName) ? '1' : '0') === feedback.options[optionStateName];				 		 
			},

			
			

		};

	}
}

