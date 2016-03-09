
var Dispatcher = require('../Dispatcher')
	, FluxStore = require('flux/utils').Store
	, ActionsType = require('../actions');

class PostsStore extends FluxStore {

	constructor(Dispatcher) {
		super(Dispatcher);
		this._posts = [];
	}

	getAll() {
		return this._posts;
	}

	__onDispatch(action) {
		switch (action.type) {
			case ActionsType('NEW_POSTS'):
				this._posts = this._posts.concat(action.posts);
				this.__emitChange();
				break;

			case ActionsType('PENDING_POST_APPROVED'):
				for (var i = 0; i < this._posts.length; i++) {
					if (this._posts[i]._clientIdentifier && this._posts[i]._clientIdentifier == action._clientIdentifier) {
						this._posts[i].pending = false;
						delete this._posts[i]._clientIdentifier;
						break ;
					}
				}
				this.__emitChange();
				break;
		}
	}
}

module.exports = new PostsStore(Dispatcher);