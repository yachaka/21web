
function BaseError(code) {
	this.code = code;
	Error.captureStackTrace(this, this.constructor);
}
BaseError.fromJSON = function (res) {
	console.error(res);
	throw new Error('fromJSON() not implemented for res');
};

BaseError.prototype.toJSON = function () {
	return {
		sucess: false,
		state: this.constructor.name
	};
};

module.exports = BaseError;