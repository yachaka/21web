
import * as errors from '../../shared/errors'

export default function wrapped(promise) {
	return promise
		.catch((err) => {
			if (err.response.body && err.response.body.state) {
				if (errors[err.response.body.state])
					throw errors[err.response.body.state].fromJSON(err.response.body);
			}
			throw err;
		});
}

// export function commonErrorsHandler(dispatch) {
// 	return function (err) {
// 		if (err instanceof ValidationError)
// 			dispatch(newValidationError(err.errors));
// 		else
// 			throw err;
// 	}
// }
