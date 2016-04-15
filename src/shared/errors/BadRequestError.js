
var BaseError = require('./BaseError');

function BadRequestError(message) {
	BaseError.call(this, 400);
	this.message = message;
}

module.exports = BadRequestError;