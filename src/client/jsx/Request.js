
import { newValidationError, VALIDATION_ERROR } from './actions'
import ValidationError from '../../server/errors/ValidationError'

export default function wrapped(promise) {
	return promise
		.then((res) => {
			if (!res.body.success && res.body.state == VALIDATION_ERROR) {
				throw new ValidationError(res.body.errors);
			}
			else if (res.body.success)
				return res.body;
		});
}

export function commonErrorsHandler(dispatch) {
	return function (err) {
		if (err instanceof ValidationError)
			dispatch(newValidationError(err.errors));
		else
			throw err;
	}
}