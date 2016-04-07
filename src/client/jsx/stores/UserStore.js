
var Dispatcher = require('../Dispatcher')
	, FluxStore = require('flux/utils').Store
	, ActionsType = require('../actions')
	, k = require('../k');

class UserStore extends FluxStore {

	constructor(Dispatcher) {
		super(Dispatcher);
		this.user = window.LOGGED_USER;
		this.location = k.LocationState('PENDING');
	}

	getClaimToken() {
		if (!this._loggedUser.tokens)
			return null;
		for (var i = 0; i < this._loggedUser.tokens.length; i++) {
			if (this._loggedUser.tokens[i].type == 'claim')
				return this._loggedUser.tokens[i];
		}
		return null;
	}

	getLoggedUser() {
		return this._loggedUser;
	}
	__onDispatch(action) {
		switch (action.type) {
			case ActionsType('USER_LOGGED_IN'):
				this.user = action.newUser;
				this.__emitChange();
				break;
			case ActionsType('SET_USER_LOCATION'):
				this.location = action.newLocation;
				this.__emitChange();
				break;
			// case ActionsType('NEW_POSTS')
			// 	this._posts = this._posts.concat(action.posts);
			// 	this.__emitChange();
			// 	break;

			// case ActionsType('PENDING_POST_APPROVED')
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