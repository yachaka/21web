
var BaseError = require('./BaseError');

class BadRequestError extends BaseError {
	static fromJSON(res) {
		return new BadRequestError(res.message);
	}

	constructor(message) {
		super(400);
		this.message = message;
	}

	toJSON() {
		const d = super.toJSON();
		d.message = this.message;

		return d;
	}
}
module.exports = BadRequestError;