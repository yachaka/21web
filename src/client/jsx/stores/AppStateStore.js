
var Dispatcher = require('../Dispatcher')
	, FluxStore = require('flux/utils').Store
	, ActionsTypes = require('../actions')
	, k = require('../k');

class AppStateStore extends FluxStore {

	constructor(Dispatcher) {
		super(Dispatcher);
		this.screen = k.Screens.GPS;
		this.location = k.LocationState.PENDING;
	}

	whichScreen() {
		return this.screen;
	}

	__onDispatch(action) {
		switch (action.type) {
			case ActionsTypes.GO_TO_SCREEN:
				this.screen = action.screen;
				this.__emitChange();
				break;

			case ActionsTypes.SET_LOCATION:
				this.location = action.newLocation;
				this.__emitChange();
				break;
		}
	}
}


module.exports = new AppStateStore(Dispatcher);