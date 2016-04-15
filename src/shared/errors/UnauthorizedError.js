
var BaseError = require('./BaseError');

function UnauthorizedError() {
	BaseError.call(this, 401);
}

module.exports = UnauthorizedError;