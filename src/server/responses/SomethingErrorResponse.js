
function SomethingErrorResponse(error, message) {
	return {
		success: false,
		state: 'SomethingError',
		error: error,
		message: message
	};
}

module.exports = SomethingErrorResponse;