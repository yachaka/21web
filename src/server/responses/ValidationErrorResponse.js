
var ErrorResponse = require('./ErrorResponse');

function ValidationErrorResponse(err) {
	var d = ErrorResponse(err.name);
	d.errors = err.errors;

	return d;
}

module.exports = ValidationErrorResponse;