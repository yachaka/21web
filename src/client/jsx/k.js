
function _between(obj) {
	return function (prop) {
		if (!obj[prop])
			throw new Error('Asked for k `'+prop+'` which was not found ; check stack');
		return obj[prop];
	}
}

module.exports = {
	Modals: {
		LOGIN: 'LoginModal'
	},
	Screens: _between({
		LOGIN_REGISTER: 'login_register',
		GPS: 'gps',
		FEED: 'feed'
	}),
	LocationState: _between({
		PENDING: 1,
		TIMEOUT: 2,
		DENIED: 3,
		UNAVAILABLE: 4,
		UNKNOWN_ERROR: 5
	})
};