const { combineRgb } = require('@companion-module/base');
const actionDef =  {

	goto : {
		name: 'Goto Desktop',
		options:  [
			{
				id: 'index',
				type: 'number',
				label: 'Desktop Index',
				default: 0,
				min: 0,
				max: 10
			},

			{
				id: 'name',
				type: 'textinput',
				label: 'Desktop Name',
				default: '',
			}
		],
		callback: async (event) => {

			actionDef.api.goto(event.options.name || event.options.index).then(function(info){
				actionDef.api.setVariableValues({visible : info.name,visibleIndex :info.index });
			});
		},
	},

	

	presets : {

		"goto": {
			category: 'Desktop',
			"type": "button",
			"style": {
				"text": "1\\n",
				"size": "24",
				"png": null,
				"alignment": "center:center",
				"pngalignment": "center:center",
				"color": 16777215,
				"bgcolor": 0,
				"show_topbar": false,
				"png64": "iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAABYZJREFUeF7tnEtMG0ccxr+1MZZ5JDwMQuAgSgOkwTxO0FMqAVISkfQCyiHhQINIkyDUiHcJlyikQjSpBKJQBZGCg6DiSCNVIQgoFwQXMI8UqQiCWkyFlAAxDwHGW82iEpa1ZXvXcbE9czQzs/P/zfefmV32WwYAC1qsEmAsAVKpVFCr1WAYBsnJyfBV+kpCGBwcjNCQUEl9HG/89t1brK6uSupzd2cXk5OTYFkWy8vLMJlMgv4EgPLy8tDY2IiAgAAOkEwuA+uhImPAwLxv5gCtra2hpKQEnZ2dPEg8QAMDA7jwxQWA/OqNhQWGfx9GRkbGYfQcID8/P4yOjeJ84nmOpjcXkjWvZ14jPS0dW1tbnFbY5pZm3Pr6ljdzEcTe0tyCe9/cA5Oens6OjIzADLOgkpyRc7+Z9k0g+epJxcyaofBRcCHts/uC0GSQIS0tDcyDhw/YmpoaQWq9/O0lKioquJXduGHE/r6wE3cHdvrUaSgUCtTX1+Pi5Yv8xZlhUPuwFoxer2cTkxJ5f1xcWERCQoLFbc/doVgav1wu57b7c5+d4+3Y05PTYBYXF9moM1FHVm0Gz3XPkZ+f74ksrMbU2tqKmwU3eYCW/lqyDOhZ2zMUFhZSQBTQBw1QBdnIh6qqKjz67pF9Kdb8YzOKi4u9KsUcAnS/+j7q6uooIGtrEAV0oA2ruxgFRAEJlg+6BjlzF6MpRlOMppijZxS6BtE1yFHN8OtTBVEFUQVJI0AVJI0fXYOogqiCpBGgCpLGj65BzlTQ4+8fo7KyUtqUuFlrhxTkjf8Xo4CcmWJUQTYemFFAFJC0J4pUQVRBAgU1NTXhzt079v1v3hsVRN/usLHNOwSo/ed2FBQUuNlZWNpw29rakP9Vvu0UI5cx/G1AbGys17yj6OPjg/n5eURqInmULb68QGqQV37n/pxDWXkZNjc3pU3NCW/t7+8Pcu95Nu6swHJhFdB/MXnau9HW5sqaF8UmoBM++ZKGd3TyKaBjKBmWQUdHB8bGxqCJ1qC8tBw+Ch/LKWYwGNjwiHBJs+FWjc1AZmYmhoeHD90FkVGRGBsdQ0RkBC+UlX9WwOh0OvZ63nW3ilHKYMkOHRMTA7OZ703R6XS4kXeDp6Kuzi4w2Vey2Re/vrBo6JAykJPaltgs4uLiBICOHxSJkefql1fBqFQqVj+pR+ynsSc1JqeOa311HRqNBtvb27x+e3t7kX0l+1BB5FykTdQe+MXIoXBmZgYK5YE9yNPL+Pg4sjKysL6+zoV6++5tNDQ0gJhaSNnb2UNSUhLm5uYOAJEfs7Ky0P1LN0JCQjzWo3r0fEcMwbN/zCJUHYr4+HguZrL1bxg3kJOTg/7+fq46z7Oq1WpRW1uLS5cvcT4qUjzV0Hv8MLy3t4e+vj5Uf1uN6enpwySyaAuP+SQGpSWl3P2Y5ozGqRmXqOV70xztfGZ6xtEmVusTf+rqu1XOK/bkhyd4s/BGUNciIKeN4FhHMpkMO3s7nN1cTCGGY6VCKdiBxPRlbxuXA9o17do7NkE91sxC6evhgIxGI5QqpShIWxtbCAoK8lwFkdRaWFjg7n/ElOWlZURHR7vU2+/SFCNQrl27hq7uLshlB2cOe8t743vk5ubiVd8re5s4pZ7LAZFRh4WFISrqg5HYnkgMBgNWVlbsqerUOv8LIKdG8JE7o4BsAJYEiKRKT08PAk8FfuR5FNc92RQGBwdRXlYuemEXDSgwMJC7mVOHqcWN3kWtyDc6nv70FEVFRaKuKAqQr68vhoaGkPZ5mqiLuroROWCqQ9WHd++OXF8UIPJdj9nZWbd5yEYefpFPjU1NTTnChqsrClBKSgomJibcClBqair0er1rAIWHh7vdx0/a29tFnaNEKcjhaXDjBv8CGdLBz4otMUkAAAAASUVORK5CYII="
			},
			"options": {
				"relativeDelay": false,
				"stepAutoProgress": true
			},
			"feedbacks": [],
			steps: [
				{
					down: [
						{
							actionId: 'goto',
							options: {
								index : 0			 
							},
						},
					],
					up: [],
				}],
		}

	}

};

module.exports = function (self) {
	actionDef.api = self.api;
	actionDef.ready = new Promise(function(resolve){
		self.api.count().then(updatePresets);


		function updatePresets(count) {
			if (count<=0) return;
	
			delete actionDef.presets.goto;
	
			for (let i = 0;i < count; i ++ ) {
				console.log("updating preset: desktop",i);
				actionDef.presets[`goto${i}`] =  {
					category: 'Desktop',
					"type": "button",
					"style": {
						"text": (i+1).toString()+"\\n",
						"size": "24",
						"png": null,
						"alignment": "center:center",
						"pngalignment": "center:center",
						"color": 16777215,
						"bgcolor": 0,
						"show_topbar": false,
						"png64": "iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAABYZJREFUeF7tnEtMG0ccxr+1MZZ5JDwMQuAgSgOkwTxO0FMqAVISkfQCyiHhQINIkyDUiHcJlyikQjSpBKJQBZGCg6DiSCNVIQgoFwQXMI8UqQiCWkyFlAAxDwHGW82iEpa1ZXvXcbE9czQzs/P/zfefmV32WwYAC1qsEmAsAVKpVFCr1WAYBsnJyfBV+kpCGBwcjNCQUEl9HG/89t1brK6uSupzd2cXk5OTYFkWy8vLMJlMgv4EgPLy8tDY2IiAgAAOkEwuA+uhImPAwLxv5gCtra2hpKQEnZ2dPEg8QAMDA7jwxQWA/OqNhQWGfx9GRkbGYfQcID8/P4yOjeJ84nmOpjcXkjWvZ14jPS0dW1tbnFbY5pZm3Pr6ljdzEcTe0tyCe9/cA5Oens6OjIzADLOgkpyRc7+Z9k0g+epJxcyaofBRcCHts/uC0GSQIS0tDcyDhw/YmpoaQWq9/O0lKioquJXduGHE/r6wE3cHdvrUaSgUCtTX1+Pi5Yv8xZlhUPuwFoxer2cTkxJ5f1xcWERCQoLFbc/doVgav1wu57b7c5+d4+3Y05PTYBYXF9moM1FHVm0Gz3XPkZ+f74ksrMbU2tqKmwU3eYCW/lqyDOhZ2zMUFhZSQBTQBw1QBdnIh6qqKjz67pF9Kdb8YzOKi4u9KsUcAnS/+j7q6uooIGtrEAV0oA2ruxgFRAEJlg+6BjlzF6MpRlOMppijZxS6BtE1yFHN8OtTBVEFUQVJI0AVJI0fXYOogqiCpBGgCpLGj65BzlTQ4+8fo7KyUtqUuFlrhxTkjf8Xo4CcmWJUQTYemFFAFJC0J4pUQVRBAgU1NTXhzt079v1v3hsVRN/usLHNOwSo/ed2FBQUuNlZWNpw29rakP9Vvu0UI5cx/G1AbGys17yj6OPjg/n5eURqInmULb68QGqQV37n/pxDWXkZNjc3pU3NCW/t7+8Pcu95Nu6swHJhFdB/MXnau9HW5sqaF8UmoBM++ZKGd3TyKaBjKBmWQUdHB8bGxqCJ1qC8tBw+Ch/LKWYwGNjwiHBJs+FWjc1AZmYmhoeHD90FkVGRGBsdQ0RkBC+UlX9WwOh0OvZ63nW3ilHKYMkOHRMTA7OZ703R6XS4kXeDp6Kuzi4w2Vey2Re/vrBo6JAykJPaltgs4uLiBICOHxSJkefql1fBqFQqVj+pR+ynsSc1JqeOa311HRqNBtvb27x+e3t7kX0l+1BB5FykTdQe+MXIoXBmZgYK5YE9yNPL+Pg4sjKysL6+zoV6++5tNDQ0gJhaSNnb2UNSUhLm5uYOAJEfs7Ky0P1LN0JCQjzWo3r0fEcMwbN/zCJUHYr4+HguZrL1bxg3kJOTg/7+fq46z7Oq1WpRW1uLS5cvcT4qUjzV0Hv8MLy3t4e+vj5Uf1uN6enpwySyaAuP+SQGpSWl3P2Y5ozGqRmXqOV70xztfGZ6xtEmVusTf+rqu1XOK/bkhyd4s/BGUNciIKeN4FhHMpkMO3s7nN1cTCGGY6VCKdiBxPRlbxuXA9o17do7NkE91sxC6evhgIxGI5QqpShIWxtbCAoK8lwFkdRaWFjg7n/ElOWlZURHR7vU2+/SFCNQrl27hq7uLshlB2cOe8t743vk5ubiVd8re5s4pZ7LAZFRh4WFISrqg5HYnkgMBgNWVlbsqerUOv8LIKdG8JE7o4BsAJYEiKRKT08PAk8FfuR5FNc92RQGBwdRXlYuemEXDSgwMJC7mVOHqcWN3kWtyDc6nv70FEVFRaKuKAqQr68vhoaGkPZ5mqiLuroROWCqQ9WHd++OXF8UIPJdj9nZWbd5yEYefpFPjU1NTTnChqsrClBKSgomJibcClBqair0er1rAIWHh7vdx0/a29tFnaNEKcjhaXDjBv8CGdLBz4otMUkAAAAASUVORK5CYII="
					},
					"options": {
						"relativeDelay": false,
						"stepAutoProgress": true
					},
					"feedbacks": [],
					steps: [
						{
							down: [
								{
									actionId: 'goto',
									options: {
										index : i			 
									},
								},
							],
							up: [],
						}],
				};
		
			}

			resolve(true);
		}
	});
	
	 
	return actionDef;

	
};

