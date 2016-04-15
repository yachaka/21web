
var BaseError = require('./BaseError');

class ValidationError extends BaseError {
	static fromJSON(res) {
		return new ValidationError(res.errors);
	}

	constructor(errors) {
		super(422);
		this.errors = errors;
	}

	toJSON() {
		const d = super.toJSON();
		d.errors = this.errors;

		return d;
	}
}
module.exports = ValidationError;