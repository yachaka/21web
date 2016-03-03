
var Dispatcher = require('../Dispatcher')
	, FluxStore = require('flux/utils').Store
	, ActionsTypes = require('../actions');

class UserStore extends FluxStore {

	constructor(Dispatcher) {
		super(Dispatcher);
		this._loggedUser = window.LOGGED_USER;
	}

	getLoggedUser() {
		return this._loggedUser;
	}

	isLogged() {
		return this._loggedUser != null;
	}
	isAnonymous() {
		return this._loggedUser == null;
	}

	__onDispatch(action) {
		switch (action.type) {
			case ActionsTypes.USER_LOGGED_IN:
				this._loggedUser = action.user;
				this.__emitChange();
				break;
			// case ActionsTypes.NEW_POSTS:
			// 	this._posts = this._posts.concat(action.posts);
			// 	this.__emitChange();
			// 	break;

			// case ActionsTypes.PENDING_POST_APPROVED:
			// 	for (var i = 0; i < this._posts.length; i++) {
			// 		if (this._posts[i]._clientIdentifier && this._posts[i]._clientIdentifier == action._clientIdentifier) {
			// 			this._posts[i].pending = false;
			// 			delete this._posts[i]._clientIdentifier;
			// 			break ;
			// 		}
			// 	}
			// 	this.__emitChange();
			// 	break;
		}
	}
}

module.exports = new UserStore(Dispatcher);