
var Dispatcher = require('../Dispatcher')
	, FluxStore = require('flux/utils').Store
	, ActionsTypes = require('../actions');

class SharingPostStore extends FluxStore {

	constructor(Dispatcher) {
		console.log(Dispatcher);
		super(Dispatcher);
		this.shareStep = 0;
		this.shareData = null;
	}

	getShareData() {
		return this.shareData;
	}

	whichShareStep() {
		return this.shareStep;
	}

	__onDispatch(action) {
		switch (action.type) {
			case ActionsTypes.GO_TO_SHARE_POST_STEP_1:
				this.shareStep = 1;
				this.__emitChange();
				break;

			case ActionsTypes.GO_TO_SHARE_POST_STEP_2:
				this.shareStep = 2;
				this.shareData = action.shareData;
				this.__emitChange();
				break;

			case ActionsTypes.CANCEL_SHARE_POST:
			case ActionsTypes.SHARE_POST:
				this.shareStep = 0;
				this.shareData = null;
				this.__emitChange();
				break;
		}
	}
}

module.exports = new SharingPostStore(Dispatcher);