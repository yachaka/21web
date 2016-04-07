
var reqwest = require('reqwest')
	, Payload = require('./Payload')
	, ActionsType = require('./')
	, Dispatcher = require('../Dispatcher');

module.exports = {

	login: function (username, password) {

		return reqwest({
			url: '/login',
			method: 'post',
			data: {
				username: username,
				password: password
			}
		})

		.then(function (json) {
			if (json.success) {
				console.log(json);
				Dispatcher.dispatch(Payload('USER_LOGGED_IN', {
					newUser: json.user
				}));
			}
		});
	}
}