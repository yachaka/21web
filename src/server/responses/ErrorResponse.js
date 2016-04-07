
function ErrorResponse(name) {

	return {
		success: false,
		state: name
	};
}

module.exports = ErrorResponse;