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

express.get('/', function (req, res) {
	res.render('index');
});

const SubRouter = expressjs.Router({mergeParams: true});
express.use('/:sub([a-zA-Z0-9]+)', SubRouter);
SubRouter.use(function (req, res, next) {
	console.log(req.user);
	next();
});
/***** Sub entry point ****/
SubRouter.get('/', function (req, res, next) {
	res.render('sub', {
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
express.post('/posts', needAuthentifiedUserMiddleware, requiredPostParamsMiddleware(['url', 'lat', 'lng', 'subs']), function (req, res, next) {
	console.log(req.body);
	var data = {
		user_id: req.user.id,
		url: req.body.url,
		title: req.body.title,
		lat: parseFloat(req.body.lat),
		lng: parseFloat(req.body.lng)
	};

	let subs = (typeof req.body.subs === 'string') ? [req.body.subs] : req.body.subs;

	Sub.query()
		.where('name', subs)
		.then((subs) => {
			return Post.createPostInSubs(data, subs.map((sub) => sub.id));
		})
		.then((post) => {
			res.json(Responses.Success({
				newPost: post
			}));
		})
		.catch(next);
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
		let missing = [];

		for (var i = 0; i < params.length; i++) {
			if (!req.body[params[i]])
				missing.push(params[i]);
		}

		if (missing.length > 0)
			return next(new BadRequestError('Missing parameters in req.body: ' + missing.join(', ')));
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
	if (typeof err.toJSON === 'function')
		res.status(err.code).json(err.toJSON());
	next(err);
});
express.listen(8080);