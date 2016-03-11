
function SuccessReponse(data) {
	if (!data)
		data = {};
	data.success = true;

	return data;
}

module.exports = SuccessReponse;