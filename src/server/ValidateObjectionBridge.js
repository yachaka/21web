
var objection = require('objection');

import Validator from '@config/validatejs'
import { ValidationError } from '../shared/errors/ValidationError'

module.exports = function (objectToValidate, options) {
  // This makes revalidation possible: `someModel.$validate()`.
  if (!objectToValidate)
    return null;
  if (options.patch || options.skipValidation)
  	return objectToValidate;

  var ModelClass = this.constructor, errors;
  objectToValidate = objectToValidate || this;

  if (errors = Validator(objectToValidate, ModelClass.schema)) {
    throw new ValidationError(errors);
  }

  return objectToValidate;
};