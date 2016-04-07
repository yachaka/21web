
var Dispatcher = require('../Dispatcher')
	, FluxStore = require('flux/utils').Store
	, ActionsType = require('../actions')
	, k = require('../k');

class AppStateStore extends FluxStore {

	constructor(Dispatcher) {
		super(Dispatcher);
		// var S = require('../components/modals/SharePost.jsx');
		this.modal = null;
	}

	__onDispatch(action) {
		switch (action.type) {
			case ActionsType('SET_MODAL'):
				this.modal = action.modal;
				this.__emitChange();
				break;

			case ActionsType('CLOSE_MODAL'):
				this.modal = null;
				this.__emitChange();
				break;
		}
	}
}


module.exports = new AppStateStore(Dispatcher);