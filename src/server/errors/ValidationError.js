
var BaseError = require('./BaseError');

function ValidationError(errors) {
	BaseError.call(this, 'ValidationError');

	this.errors = errors;
}

module.exports = ValidationError;