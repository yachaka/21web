
var BaseError = require('./BaseError');

function BadRequestError(message) {
	BaseError.call(this, 'BadRequestError');

	this.code = 400;
	this.message = message;
}

module.exports = BadRequestError;