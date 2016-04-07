
module.exports = function (type) {
	var types = {
		SET_MODAL: "SET_MODAL",
		CLOSE_MODAL: "CLOSE_MODAL",
		
		SET_SHARE_DATA: "SET_SHARE_DATA",
		SET_USER_LOCATION: "SET_USER_LOCATION",

		GO_TO_SCREEN: "GO_TO_SCREEN",

		USER_LOGGED_IN: "USER_LOGGED_IN",

		SHARE_POST: "SHARE_POST",
		CANCEL_SHARE_POST: "CANCEL_SHARE_POST",
		PENDING_POST_APPROVED: "PENDING_POST_APPROVED",

		NEW_POSTS: "NEW_POSTS"
	};

	if (types[type] === undefined || types[type] === "" || types[type] === null) {
		throw new Error('`'+type+'` type isn\'t a valid type.');
	}

	return type;
};