
var BaseError = require('./BaseError');

function UnauthorizedError() {
	BaseError.call(this, 'UnauthorizedError');

	this.code = 401;
}

module.exports = UnauthorizedError;