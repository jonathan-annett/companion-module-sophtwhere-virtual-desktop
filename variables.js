const slotcount = 30;
const variable_defs = [];
const variable_def_lookup = {};
const variable_ids = [];

module.exports = async function (self) {

	module.exports.resetVariable  = resetVariable.bind(null,self);
	module.exports.resetVariables = resetVariables.bind(null,self);

	module.exports.getVariable = getVariable.bind(null,self);
	module.exports.setVariable = setVariable.bind(null,self);

	module.exports.vars = createVariablesProxy(self);


	variable_defs.splice(
		0,variable_defs.length,

		{ variableId: 'count', name: 'count of desktops' , default : 0 },
		
		
	);


	const setValues = {};

	Object.keys(variable_def_lookup).forEach(function(k){delete variable_def_lookup[k]});

	variable_ids.splice(0,variable_ids.length);

	self.setVariableDefinitions(variable_defs.map(function(v){
		const id = v.variableId,def = v.default;
		if (typeof def!=='undefined') {
			setValues[id]=def;
		}
		variable_def_lookup[id]=v;
		variable_ids.push(id);
		return { variableId: id, name: v.name  };
	}));
	self.setVariableValues(setValues);
}



function resetVariable(self,varid) {
	const payload = {};
	const def = variable_def_lookup[varid];
	if (def) {
		payload[varid]=def.default||'';
		self.setVariableValues(payload)
	}
}

function resetVariables(self,varids) {
	const payload = {};
	if (!Array.isArray(varids)) {
		varids = variable_ids;
	}
	varids.forEach(function(varid){
		const def = variable_def_lookup[varid];
		if (def) {
			payload[varid]=def.default||'';
		}
	});
	self.setVariableValues(payload);
}

function getVariable (self,varid) {
	const def = variable_def_lookup[varid];
	if (def) {
		const result = self.getVariableValue(varid);
		return typeof result === 'undefined' ? def.default : result;
	}	
}

function setVariable (self,varid,value) {
	const def = variable_def_lookup[varid];
	if (def) {
		const payload = {};
		payload[varid] = typeof value === 'undefined' ? def.default : value ;
		self.setVariableValues(payload)
	}	
}

function createVariablesProxy(self) {

	const target = { };
	  
	const handler = {
		get(target, varid) {
			const def = variable_def_lookup[varid];
			if (def) {
				return  self.getVariableValue(varid);
			}
		},

		set(target, varid, value) {
			const def = variable_def_lookup[varid];
			if (def) {
				const payload = {};
				payload[varid] = typeof value === 'undefined' ? def.default : value ;
				self.setVariableValues(payload);
				return true;
			} else {
				console.warn(`bad variable assignment ${varid} = ${value}`,new Error().stack.split('\n')[2])
				return true;// avoid exception on incorrect variable name.
			}
			
		},

		ownKeys(target) {
			return variable_ids.slice();
		},
		getOwnPropertyDescriptor(target,varid) {
			const exists = !!variable_def_lookup[varid];
			return {
			  enumerable: exists,
			  configurable: exists,
			  value : exists ? self.getVariableValue(varid) : undefined
			};
		  }
	  };
	  
	  return new Proxy(target, handler);
}