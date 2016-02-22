
var Dispatcher = require('../Dispatcher')
	, ActionsType = require('./');

module.exports = {

	goToSharePostStep1: Dispatcher.emit.bind(Dispatcher, ActionsType.GO_TO_SHARE_POST_STEP_1),
	goToSharePostStep2: Dispatcher.emit.bind(Dispatcher, ActionsType.GO_TO_SHARE_POST_STEP_2),
	sharePost: Dispatcher.emit.bind(Dispatcher, ActionsType.SHARE_POST)

};