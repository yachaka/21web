
import validate from 'validate.js'

validate.validators.isObject = function (value, options, key, attributes) {
	if (typeof value === 'object')
		return null;
	return 'must be an object';
};

export default validate