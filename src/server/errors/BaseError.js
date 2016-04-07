
function BaseError(name) {
	this.name = name;
	Error.captureStackTrace(this, this.constructor);
}

module.exports = BaseError;