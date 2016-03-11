
function ValidationErrorResponse(errors) {
	return {
		success: false,
		state: 'ValidationError',
		errors: errors
	};
}

module.exports = ValidationErrorResponse;