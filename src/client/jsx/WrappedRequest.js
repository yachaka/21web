
import * as errors from '../../shared/errors'

export default function wrapped(promise) {
	return promise
		.catch((res) => {
			if (res.body && res.body.state) {
				if (errors[res.body.state])
					throw errors[res.body.state].fromJSON(res.body);
			}
			throw res;
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
