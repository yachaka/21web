
var BaseError = require('./BaseError');

import { VALIDATION_ERROR } from '../../client/jsx/actions';
module.exports.VALIDATION_ERROR = VALIDATION_ERROR

export default function ValidationError(errors) {
	BaseError.call(this, VALIDATION_ERROR);

	this.errors = errors;
}

module.exports = ValidationError;