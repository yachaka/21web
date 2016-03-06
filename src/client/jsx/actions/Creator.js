
var reqwest = require('reqwest');

var Dispatcher = require('../Dispatcher')
	, ActionsType = require('./');

var _dispatch = function (ActionType, argumentsKeys) {

    return function () {
        var payload = {
            type: ActionType
        };

        if (argumentsKeys && argumentsKeys.length != arguments.length) {
            console.error('Arguments required:', argumentsKeys);
            console.error('Arguments provided:', arguments);
            throw new Error('Arguments mismatch required arguments in a call to Creator. See console debug');
        }
        if (argumentsKeys) {
            for (var i = 0; i < argumentsKeys.length; i++) {
                payload[argumentsKeys[i]] = arguments[i];
            }
        }
        Dispatcher.dispatch(payload);
    }
};

module.exports = {

    // fetchNewLoggedUserData: function () {
    //     reqwest({
    //         url: '/me',
    //         method: 'get',
    //         type: 'json'
    //     })

    //     .then(function (user) {
    //         console.log('New user data:', user);
    //     });
    // },

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
        post._clientIdentifier = new Date().getTime();

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
                if (json.newUser)
                    Dispatcher.dispatch({
                        type: ActionsType.USER_LOGGED_IN,
                        user: json.newUser
                    });
                
                Dispatcher.dispatch({
                    type: ActionsType.PENDING_POST_APPROVED,
                    postId: json.postId,
                    _clientIdentifier: json._clientIdentifier
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
	},

    setLocation: _dispatch(ActionsType.SET_LOCATION, ['newLocation']),

    goToScreen: _dispatch(ActionsType.GO_TO_SCREEN, ['screen'])

};