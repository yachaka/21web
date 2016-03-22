
var Validator = require('validate.js')
	, objection = require('objection');

module.exports = function (objectToValidate, options) {
  // This makes revalidation possible: `someModel.$validate()`.
  if (options.patch || options.skipValidation)
  	return objectToValidate;

  var ModelClass = this.constructor, errors;
  objectToValidate = objectToValidate || this;

  if (errors = Validator(objectToValidate, ModelClass.schema)) {
    throw new objection.ValidationError(errors);
  }

  return objectToValidate;
};