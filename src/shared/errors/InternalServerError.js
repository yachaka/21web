
var BaseError = require('./BaseError');

function InternalServerError(originalError) {
	BaseError.call(this, 500);

	this.originalError = originalError;
}

module.exports = InternalServerError;