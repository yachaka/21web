
function ValidateFactory(Validator) {

	return {
		getInitialState: function () {
			return {
				validationErrors: []
			};
		},

		validate: function () {
		},

		error: function () {
			
		}
	};
}

module.exports = ValidateFactory;