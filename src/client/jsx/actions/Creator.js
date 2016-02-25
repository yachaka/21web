
var reqwest = require('reqwest');

var Dispatcher = require('../Dispatcher')
	, ActionsType = require('./');

var _dispatch = function (ActionType) {
    return function () {
        Dispatcher.dispatch({
            type: ActionType
        });
    }
};

module.exports = {

	goToSharePostStep1: _dispatch(ActionsType.GO_TO_SHARE_POST_STEP_1),
	goToSharePostStep2: function (url, text) {
        Dispatcher.dispatch({
            type: ActionsType.GO_TO_SHARE_POST_STEP_2,
            shareData: {
                url: url,
                text: text
            }
        });
    },
	sharePost: function (post) {
        _dispatch(ActionsType.SHARE_POST)();
        Dispatcher.dispatch({
            type: ActionsType.NEW_POSTS,
            posts: [post]
        });
        reqwest({
            url: '/posts',
            method: 'post',
            type: 'json',
            data: post
        })

        .then(function (json) {
            if (json.success) {
                Dispatcher.dispatch({
                    type: ActionsType.PENDING_POST_APPROVED,
                    postId: json.postId
                });
            } else {
                console.log(json);
            }
        })
    },
	cancelSharePost: _dispatch(ActionsType.CANCEL_SHARE_POST),

	fetchPosts: function () {
		reqwest({
            url:'/posts',
            method: 'get',
            type: 'json'
        })

        .then(function (json) {
            Dispatcher.dispatch({
                type: ActionsType.NEW_POSTS,
                posts: json.posts
            });
        }, function (err, msg) {
            console.error(err, msg);
        });
	}

};