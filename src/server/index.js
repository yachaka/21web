// Root directory as module search path, @see https://github.com/yachaka/local-modules-as-globals
import 'local-modules-as-globals/register'

import md5 from 'md5'

import cfg from './config'
import { Post, User, Token, Preview, Sub } from '@models'

var path = require('path')
	, reqwest = require('reqwest');


import expressjs from 'express'
import express from '@config/express'

var Responses = require('./responses');

import { BaseError, ValidationError, NotFoundError, UnauthorizedError, BadRequestError } from '../shared/errors'

var UserRanks = require('./auth/ranks');

var ReCaptchaMiddleware = require('./middlewares/ReCaptcha')('6LfbVBoTAAAAAN2gkqo5ZhN6t2drnY5zZo-RN9Tb');

/*********
* Routes
***************/
const SubRouter = expressjs.Router({mergeParams: true});
express.use('/:sub([a-zA-Z0-9]+)', SubRouter);
SubRouter.use(function (req, res, next) {
	console.log(req.user);
	next();
});
/***** Entry point ****/
SubRouter.get('/', function (req, res, next) {
	res.render('index', {
		sub: req.params.sub,
		__IFRAMELY_HASH_KEY__: md5(cfg.IFRAMELY_API_KEY)
	});
});
/**** GET /posts ***/
SubRouter.get('/posts', function (req, res) {
	Sub.query()
		.first()
		.where('name', req.params.sub)
		.then(function (sub) {
			if (!sub)
				return [];

			return sub.$relatedQuery('posts')
				.eager('[user, preview]');
		})
		.then(function (posts) {
			res.json({
				posts: posts
			});
		});
});

/***** Add a post *****/
express.post('/posts', needAuthentifiedUserMiddleware, function (req, res) {
	console.log(req.body);
	var data = {
		user_id: req.user.id,
		url: req.body.url,
		title: req.body.title,
		lat: parseFloat(req.body.lat),
		lng: parseFloat(req.body.lng)
	};
	Post.query()
		.insert(data)
		.then(function (newPost) {
			var json = {
				postId: newPost.id,
				_clientIdentifier: req.body._clientIdentifier
			};

			if (req.userJustGotCreated)
				json.newUser = req.user;

			res.json(Responses.Success(json));
		})
		.catch(function (err) {
			console.log(err.stack);
			res.json({
				errors: err.data
			});
		});
});

function needAuthentifiedUserMiddleware(req, res, next) {
	if (req.user.anonymous) {
		res.status(401).send('Unauthorized');
	} else
		next();
}

function requiredPostParamsMiddleware(params) {
	if (!(params instanceof Array))
		throw new Error('`params` argument must be an Array in requiredPostParamsMiddleware.');

	return function (req, res, next) {
		for (var i = 0; i < params.length; i++) {
			if (!req.body[params[i]]) {
				console.error('Missing body parameters to POST request', params, req.body);
				return res.status(400).json({
					error: 'Missing body parameters to POST request'
				});
			}
		}
		next();
	}
}

express.post('/login',
	function (req, res, next) {

		User.query()
			.first()
			.eager('permissions')
			.where({username: req.body.username, password: req.body.password})
			.then(function (user) {
				if (!user)
					return next(new ValidationError({__global: ['Utilisateur ou mot de passe incorrect']}));
				req.login(user, function (err) {
					if (err)
						return next(new InternalServerError(err));
					return res.json(Responses.Success({user: user}));
				});
			})
			.catch(next);
	}
);

express.get('/logout',
	needAuthentifiedUserMiddleware,
	function (req, res, next) {
		req.logout();
		res.json(Responses.Success());
	}
);

express.post('/claim/:token',
	needAuthentifiedUserMiddleware,
	requiredPostParamsMiddleware(['username', 'password']),
	ReCaptchaMiddleware('recaptcha'),
	function (req, res, next) {

		Token.query()
			.first()
			.where({type: 'claim', 'value': req.params.token})
			.then(function (token) {
				if (!token)
					throw new Error('Token not found');

				return objection.transaction(User, function (User) {
					return User.query()
						.patchAndFetchById(token.user_id, {
							unclaimed: false,
							username: req.body.username,
							password: req.body.password
						})
						.then(function (updatedUser) {
							return updatedUser
								.$relatedQuery('tokens')
								.whereIn('type', ['claim', 'connect'])
								.del()
								.return(updatedUser);
						});
				});
			})
			.then(function (updatedUser) {
				res.json({
					success: true,
					updatedUser: updatedUser
				});
			})
			.catch(next);
});

var T = function (req, res, next) {
	if (req.params.number > 1) {
		console.log('trueee')
		return next('route');
	}
	next();
};
express.get('/:number([0-9]+)', T, (req, res) => {console.log('handled');res.send('foo uno');});
express.get('/:number([0-9]+)/bar', T, (req, res) => res.send('bar uno'));

express.get('/:number([0-9]+)', (req, res) => res.send('foo 2nd'));
express.get('/:number([0-9]+)/bar', (req, res) => res.send('bar 2nd'));


var fetchSubMiddleware = function (req, res, next) {
	if (!req.params.sub)
		return next(new BadRequestError('fetchSubMiddleware: Expected to find a `sub` params. Path: '+req.path));

	Sub.query()
		.first()
		.where('name', req.params.sub)
		.then(function (sub) {
			if (!sub)
				return next(new NotFoundError('Sub `'+req.params.sub+'` does not exist.'));

			req.sub = sub;
			next();
		});
};

var needRankOnSubMiddleware = function (rankNeeded) {
	return function (req, res, next) {
		for (var i = 0; i < req.user.permissions.length; i++) {
			if (req.user.permissions[i].sub_id == req.sub.id && req.user.permissions[i].rank >= rankNeeded)
				return next();
		}
		return next(new UnauthorizedError());
	};
};

var AdminRouter = expressjs.Router();
AdminRouter.use(needAuthentifiedUserMiddleware);
AdminRouter.get('/', function (req, res) {
	res.send('Index');
});
AdminRouter.get('/:sub([a-zA-Z0-9]+)', fetchSubMiddleware, needRankOnSubMiddleware(UserRanks.ADMIN), function (req, res) {
	res.send('Ok boi');
});

express.use('/admin', AdminRouter);

express.use(function (err, req, res, next) {
	res.status(err.code).json(err.toJSON());
});
express.listen(8080);