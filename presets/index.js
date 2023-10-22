/*!
 * companion-module-sophtwhere-timer/presets/index.js
 * Copyright(c) 2023 Jonathan Annett
 * MIT Licensed
 */
const { combineRgb } = require('@companion-module/base');
module.exports = function (self) {
	const api = self.api;

	const variable_presets = {
/*
		'remaining': {
			type: 'button',
			category: 'Time Remaining',
			name: 'Remaining',
			style: {
				text: '$(timer:remain)',
				size: '24',
				color: combineRgb(255, 255, 255),
			    bgcolor: combineRgb(0, 0, 0),
	
			},
			steps: [
				{
					down: [
					 
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'Expired',
					style: {
						bgcolor: combineRgb(0, 0, 0),
					    color: combineRgb(255, 0, 0),
					},
					options: {
						expiredStatus: '1',
					},
				},
				{
					feedbackId: 'Impending',
					style: {
						bgcolor: combineRgb(0, 0, 0),
					    color: combineRgb(255, 128, 0),
					},
					options: {
						impendingStatus: '1',
					},
				},
			],
		},

		'actual_remaining': {
			type: 'button',
			category: 'Actual Time Remaining',
			name: 'Actual Remaining',
			style: {
				text: '$(timer:remain_actual)',
				size: '24',
				color: combineRgb(255, 255, 255),
			    bgcolor: combineRgb(0, 0, 0),
	
			},
			steps: [
				{
					down: [
					 
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'Expired',
					style: {
						bgcolor: combineRgb(0, 0, 0),
					    color: combineRgb(255, 0, 0),
					},
					options: {
						expiredStatus: '1',
					},
				},
				{
					feedbackId: 'Impending',
					style: {
						bgcolor: combineRgb(0, 0, 0),
					    color: combineRgb(255, 128, 0),
					},
					options: {
						impendingStatus: '1',
					},
				},
			],
		},

		'elapsed': {
			type: 'button',
			category: 'Time Elapsed',
			name: 'Elapsed',
			style: {
				text: '$(timer:elapsed)',
				size: '24',
				color: combineRgb(255, 255, 255),
			    bgcolor: combineRgb(0, 0, 0),
	
			},
			steps: [
				{
					down: [
					 
					],
					up: [],
				},
			],
			feedbacks: [
				
			],
		},

		'paused': {
			type: 'button',
			category: 'Time Paused',
			name: 'Paused',
			style: {
				text: '$(timer:paused)',
				size: '24',
				color: combineRgb(255, 255, 255),
			    bgcolor: combineRgb(0, 0, 0),
	
			},
			steps: [
				{
					down: [
					 
					],
					up: [],
				},
			],
			feedbacks: [
				
			],
		},

		'pauses': {
			type: 'button',
			category: 'Accumulated Pause Time',
			name: 'Pauses',
			style: {
				text: '$(timer:pauses)',
				size: '24',
				color: combineRgb(255, 255, 255),
			    bgcolor: combineRgb(0, 0, 0),
	
			},
			steps: [
				{
					down: [
					 
					],
					up: [],
				},
			],
			feedbacks: [
				
			],
		},

		'endsAt': {
			type: 'button',
			category: 'Timer',
			name: 'Ends At',
			style: {
				text: 'Ends At\n$(timer:endsAt)',
				size: '18',
				color: combineRgb(255, 255, 255),
			    bgcolor: combineRgb(0, 0, 0),
	
			},
			steps: [
				{
					down: [
					 
					],
					up: [],
				},
			],
			feedbacks: [
				
			],
		},

		'startedAt': {
			type: 'button',
			category: 'Timer',
			name: 'Started At',
			style: {
				text: 'Started\n$(timer:startedAt)',
				size: '18',
				color: combineRgb(255, 255, 255),
			    bgcolor: combineRgb(0, 0, 0),
	
			},
			steps: [
				{
					down: [
					 
					],
					up: [],
				},
			],
			feedbacks: [
				
			],
		} 
*/
	};

	const presets = {
		...api.presets,
		...variable_presets
	};



	self.setPresetDefinitions(presets);


}
