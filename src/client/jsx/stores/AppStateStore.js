
var Dispatcher = require('../Dispatcher')
	, FluxStore = require('flux/utils').Store
	, ActionsType = require('../actions')
	, k = require('../k');

class AppStateStore extends FluxStore {

	constructor(Dispatcher) {
		super(Dispatcher);
		this.location = k.LocationState.PENDING;
		this.screen = k.Screens.GPS;
		this.modal = null;
		var Login = require('../components/modals/Login.jsx');
		this.appModal = <Login/>;

		this.currentShareData = {};
	}

	whichScreen() {
		return this.screen;
	}

	__onDispatch(action) {
		switch (action.type) {
			case ActionsType('SET_SHARE_DATA'):
				console.log(action.data)
				this.currentShareData = action.data;
				this.__emitChange();
				break;

			case ActionsType('SET_MODAL'):
				this.modal = action.modal;
				this.__emitChange();
				break;

			case ActionsType('GO_TO_SCREEN'):
				this.screen = action.screen;
				this.__emitChange();
				break;

			case ActionsType('SET_LOCATION'):
				this.location = action.newLocation;
				this.__emitChange();
				break;
		}
	}
}


module.exports = new AppStateStore(Dispatcher);