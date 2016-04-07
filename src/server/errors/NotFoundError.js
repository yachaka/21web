
var BaseError = require('./BaseError');

function NotFoundError(message) {
	BaseError.call(this, 'NotFoundError');

	this.code = 400;
	this.message = message;
}

module.exports = NotFoundError;