
var React = require('react');

function ValidateFactory(Validate) {

	return {
		// childContextTypes: {
		// 	getErrors: React.PropTypes.func
		// },
		// getChildContext: function () {
		// 	return {
		// 		getErrors: this.errors
		// 	};
		// },

		getInitialState: function () {
			return {
				validationErrors: {}
			};
		},
		registerFor: function (attribute) {
			var self = this, lastElement;

			function _change(e) {
				var obj = {};
				obj[attribute] = e.target.value;
				self.setState(obj);
			}

			return function (element) {
				if (element == null && lastElement) {
					lastElement.removeEventListener('input', _change);
					return;
				}

				element.addEventListener('input', _change);
				lastElement = element;
			};
		},
		// componentWillUpdate: function () {
		// 	for (var key in this.refs) {
		// 		if (!_listeners[key])
		// 			continue ;
		// 		this.refs[key].removeEventListener('input', _listeners[key]);
		// 		delete _listeners[key];
		// 	}
		// },
		// componentDidUpdate: function (pProps, pState) {
		// 	for (var key in this.refs) {
		// 		_listeners[key] = this.clean.bind(this, key);
		// 		this.refs[key].addEventListener('input', _listeners[key]);
		// 		if (_refsData[key]) {
		// 			this.refs[key].value = _refsData[key];
		// 		}
		// 	}
		// },

		validate: function (attributes, constraints) {
			var errors = Validate(attributes, constraints);
			errors = errors ? errors : {};

			this.setState({
				validationErrors: errors
			});

			return errors;
		},

		errors: function (attribute) {
			return this.state.validationErrors[attribute];
		}
	};
}

module.exports = ValidateFactory;