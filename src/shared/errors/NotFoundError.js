
var BaseError = require('./BaseError');

function NotFoundError(message) {
	BaseError.call(this, 404);

	this.message = message;
}

module.exports = NotFoundError;