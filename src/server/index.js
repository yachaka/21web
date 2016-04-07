
var path = require('path')
	, reqwest = require('reqwest');

var expressS = require('express')
	, express = expressS()
	, consolidate = require('consolidate')
	, session = require('express-session')
	, cookieParser = require('cookie-parser')
	, bodyParser = require('body-parser')
	, escapeRegExp = require('escape-string-regexp')

	, passport = require('passport')
	, AnonymousStrategy = require('./strategies/AnonymousStrategy')

	, objection = require('objection')
	, Model = objection.Model
	, Knex = require('knex')

	, Responses = require('./responses')
	, ValidationError = require('./errors/ValidationError')
	, NotFoundError = require('./errors/NotFoundError')
	, UnauthorizedError = require('./errors/UnauthorizedError')
	, BadRequestError = require('./errors/BadRequestError')

	, UserRanks = require('./auth/ranks');

var Post = require('./models/Post')
	, User = require('./models/User')
	, Token = require('./models/Token')
	, Preview = require('./models/Preview')
	, Sub = require('./models/Sub');

var ReCaptchaMiddleware = require('./middlewares/ReCaptcha')('6LfbVBoTAAAAAN2gkqo5ZhN6t2drnY5zZo-RN9Tb');

/**
* KNEX Query Build: database connection
**/
var knex = Knex({
	client: 'mysql',
	connection: {
		host: 'climbing7.com',
		user: 'arcodep',
		password: '-TAPCLPuX4+6',
		database: 'arcodep_21'
	}
});

Model.knex(knex);

/*******
* View Engine configuration (MustacheJS)
*******/
express.engine('jade', consolidate.jade);
express.set('view engine', 'jade');
express.set('views', path.join(__dirname, '../client/views'));

/*******
* Authentification STRATEGIES
*******/
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new AnonymousStrategy({}, function (connectToken, done) {
	Token.query()
		.first()
		.where({
			type: 'connect',
			value: connectToken
		})
		.then(function (token) {
			if (!token)
				return null;
			
			return User.query()
				.first()
				.eager('tokens')
				.where('id', token.user_id);
		})
		.then(function (user) {
			done(null, user);
		})
		.catch(done);
}, function (ip, done) {
	User.query()
		.first()
		.where({unclaimed: true, last_ip_connected: ip})
		.eager('tokens')
		.then(function (user) {
			done(null, user);
		})
		.catch(done);
}));

/********
* MIDDLEWARES
********/
express.use(expressS.static(path.join(__dirname, '../client/dist/')));
express.use(cookieParser());
express.use(bodyParser.urlencoded({ extended: false }));
express.use(session({secret: '21Locate sisi les potos', resave: false, saveUninitialized: true}));
express.use(passport.initialize());
express.use(passport.session());
express.use(passport.authenticate('anonymous'));
express.use(function (req, res, next) {
	console.log(req.xhr);
	res.locals.user = req.user;
	next();
});
/*******************/




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
	requiredPostParamsMiddleware(['username', 'password']),
	function (req, res, next) {

		User.query()
			.first()
			.eager('permissions')
			.where({username: req.body.username, password: req.body.password})
			.then(function (user) {
				if (!user)
					return next(new ValidationError({__global: ['Utilisateur ou mot de passe incorrect']}));
				req.login(user, function (err) {
					if (err) return res.json(Responses.SomethingError(err.name, err.message));
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

var AdminRouter = expressS.Router();
AdminRouter.use(needAuthentifiedUserMiddleware);
AdminRouter.get('/', function (req, res) {
	res.send('Index');
});
AdminRouter.get('/:sub([a-zA-Z0-9]+)', fetchSubMiddleware, needRankOnSubMiddleware(UserRanks.ADMIN), function (req, res) {
	res.send('Ok boi');
});

express.use('/admin', AdminRouter);

var SubRouter = expressS.Router({mergeParams: true});
SubRouter.get('/', function (req, res, next) {
// oEmbedPreviewGenerator('https://www.instagram.com/p/BDOqXXAMVlQ/');
	// generatePreview('https://www.facebook.com/B2OUF/videos/926159704167131/', function (preview) {
	// 	console.log('got preview!', preview);
	// });

	// console.log('Path ', req.path, ', user: ', req.user);
	// Post.query()
	// 	.then(function (posts) {
	// 		posts.forEach(function (post) {
	// 			Preview.retrievePreview(post.url)
	// 				.then(function (preview) {
	// 					Post.query()
	// 						.patch({
	// 							preview_id: preview.id
	// 						})
	// 						.where({id: post.id})
	// 						.then(function(rows) {
	// 							console.log(rows);
	// 						});
	// 				});
	// 		});
	// 	});
	// Preview.retrievePreview('https://www.instagram.com/p/BDOgng1PrJW/')
	// 	.then(function (preview) {
	// 		console.log('got preview!', preview);
	// 	})
	// 	.catch(next);
// res.send('Ok!');
	res.render('index', {
		sub: req.params.sub
	});
	// res.sendStatus(200);
	// res.sendFile(path.join(__dirname, '../client/index.html'));
});

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

express.use('/:sub([a-zA-Z0-9]+)', SubRouter);

express.use(function (err, req, res, next) {
	
	if (err instanceof ValidationError) {
		res.json(Responses.ValidationError(err));
	}
	console.error(err);
	console.error(err.stack)
	res.status(500).send('Something broke!');
});
express.listen(8080);