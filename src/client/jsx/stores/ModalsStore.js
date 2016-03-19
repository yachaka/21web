
var React = require('react')
	, Dispatcher = require('../Dispatcher')
	, FluxStore = require('flux/utils').Store
	, ActionsType = require('../actions');

var BASE_ZINDEX = 10;

class ModalsStore extends FluxStore {

	constructor(Dispatcher) {
		super(Dispatcher);
		this.__modals = [];
	}

	modals() {
		return this.__modals;
	}

	isModalActive(name) {
		for (var i = 0; i < this.__modals.length; i++) {
			if (this.__modals[i].type.displayName == name)
				return true;
		}
		return false;
	}

	__pushModal(modal) {
		var zIndexedModal = React.cloneElement(modal, {key: this.__modals.length, style: {zIndex: BASE_ZINDEX + this.__modals.length}});

		this.__modals.push(zIndexedModal);	
	}

	__onDispatch(action) {
		switch (action.type) {
			case ActionsType('PUSH_MODAL'):
				this.__pushModal(action.modal);
				this.__emitChange();
				break;

			case ActionsType('POP_MODAL'):
				this.__modals.pop();
				this.__emitChange();
				break; 
		}
	}
}

module.exports = new ModalsStore(Dispatcher);