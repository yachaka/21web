
var reqwest = require('reqwest');

var Dispatcher = require('../Dispatcher')
	, ActionsType = require('./');

module.exports = {

	goToSharePostStep1: Dispatcher.emit.bind(Dispatcher, ActionsType.GO_TO_SHARE_POST_STEP_1),
	goToSharePostStep2: Dispatcher.emit.bind(Dispatcher, ActionsType.GO_TO_SHARE_POST_STEP_2),
	sharePost: Dispatcher.emit.bind(Dispatcher, ActionsType.SHARE_POST),
	cancelSharePost: Dispatcher.emit.bind(Dispatcher, ActionsType.CANCEL_SHARE_POST),

	fetchPosts: function () {
		reqwest({
            url:'/posts',
            method: 'get',
            type: 'json'
        })

        .then(function (json) {
            Dispatcher.emit(ActionsType.NEW_POSTS, json.posts);
        }, function (err, msg) {
            console.error(err, msg);
        });
	}

};