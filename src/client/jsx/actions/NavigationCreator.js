
var reqwest = require('reqwest');

var Dispatcher = require('../Dispatcher')
    , Payload = require('./Payload')
	, ActionsType = require('./');

// var _dispatch = function (ActionType, argumentsKeys) {

//     return function () {
//         var payload = {
//             type: ActionType
//         };

//         if (argumentsKeys && argumentsKeys.length > arguments.length) {
//             console.error('Arguments required:', argumentsKeys);
//             console.error('Arguments provided:', arguments);
//             throw new Error('Arguments mismatch required arguments in a call to Creator. See console debug');
//         }
//         if (argumentsKeys) {
//             for (var i = 0; i < argumentsKeys.length; i++) {
//                 payload[argumentsKeys[i]] = arguments[i];
//             }
//         }
//         Dispatcher.dispatch(payload);
//     }
// };

module.exports = {

    setModal: function (modal) {
        Dispatcher.dispatch(Payload('SET_MODAL', {
            modal: modal
        }));
    },
    closeModal: function () {
       Dispatcher.dispatch(Payload('CLOSE_MODAL'));
    },

    setShareData: function (data) {
        Dispatcher.dispatch({
            type: ActionsType('SET_SHARE_DATA'),
            data: data
        });
    }
 	

};