
var path = require('path')
	, reqwest = require('reqwest');

var expressS = require('express')
	, express = expressS()
	, consolidate = require('consolidate')
	, session = require('express-session')
	, cookieParser = require('cookie-parser')
	, bodyParser = require('body-parser')

	, passport = require('passport')
	, AnonymousStrategy = require('./strategies/AnonymousStrategy')

	, objection = require('objection')
	, Model = objection.Model
	, Knex = require('knex')

	, Responses = require('./responses');

var Post = require('./models/Post')
	, User = require('./models/User')
	, Token = require('./models/Token');

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
	res.locals.user = req.user;
	next();
});
/*******************/


function formatOEmbedResponse(url, oembed) {
	var type_data;

	if (oembed.type == 'photo')
		type_data = {
			url: oembed.url,
			width: oembed.width,
			height: oembed.height
		};
	else if (oembed.type == 'video' || oembed.type == 'rich')
		type_data = {
			html: oembed.html,
			width: oembed.width,
			height: oembed.height
		};
	else
		type_data = {};

	return {
		url: url,
		author_name: oembed.author_name,
		author_url: oembed.author_url,
		provider_name: oembed.provider_name,
		provider_url: oembed.provider_url,
		thumbnail_url: oembed.thumbnail_url,
		type: oembed.type,
		type_data: type_data
	};
}

var PreviewGenerators = [
	{
		pattern: /https?:\/\/www.facebook.com(\/.*)/,
		fn: function (url, done) {

			var FACEBOOK_VIDEO_OEMBED_ENDPOINT = 'https://www.facebook.com/plugins/video/oembed.json/?url=';

			var postUrlSchemes = [
				/https?:\/\/www.facebook.com\/[a-zA-Z0-9\.]+\/posts\/[0-9]+/,
				/https?:\/\/www.facebook.com\/[a-zA-Z0-9\.]+\/posts\/[0-9]+/,
				/https?:\/\/www.facebook.com\/[a-zA-Z0-9\.]+\/activity\/[0-9]+/,
				/https?:\/\/www.facebook.com\/photo\.php\?fbid=[0-9]+/,
				/https?:\/\/www.facebook.com\/photos\/[0-9]+/,
				/https?:\/\/www.facebook.com\/permalink\.php\?story_fbid=[0-9]+/,
				/https?:\/\/www.facebook.com\/media\/set\?set=[0-9]+/,
				/https?:\/\/www.facebook.com\/questions\/[0-9]+/,
				/https?:\/\/www.facebook.com\/notes\/[a-zA-Z0-9\.]\/(.*)\/[0-9]+/
			];

			var videoUrlSchemes = [
				/https?:\/\/www.facebook.com\/[a-zA-Z0-9\.]+\/videos\/[0-9]+/,
				/https?:\/\/www.facebook.com\/video.php\?id=[0-9]+/,
				/https?:\/\/www.facebook.com\/video.php\?v=[0-9]+/
			];

			for (var i = 0; i < postUrlSchemes.length; i++) {
				if (url.match(postUrlSchemes[i])) {
				}
			}

			for (var i = 0; i < videoUrlSchemes.length; i++) {
				if (url.match(videoUrlSchemes[i])) {
					reqwest({
						url: FACEBOOK_VIDEO_OEMBED_ENDPOINT + url,
						type: 'json'
					})
					.then(function (json) {
						done(formatOEmbedResponse(url, json));
					});
				}
			}
		}
	}
];

var oEmbedPreviewGenerator = function (url) {

	reqwest({
		url: 'http://oembed.com/providers.json',
		type: 'json'
	})
	.then(function (providers) {
		console.log(providers[0]);
	});

};

function generatePreview(url, done) {
	for (var i = 0; i < PreviewGenerators.length; i++) {
		if (url.match(PreviewGenerators[i].pattern)) {
			console.log('Matched with generator!', PreviewGenerators[i].pattern);
			PreviewGenerators[i].fn(url, done);
			break ;
		}
	}
}

express.get('/', function (req, res) {
// oEmbedPreviewGenerator();
	// generatePreview('https://www.facebook.com/B2OUF/videos/926159704167131/', function (preview) {
	// 	console.log('got preview!', preview);
	// });

	// console.log('Path ', req.path, ', user: ', req.user);
	res.render('index');
	// res.sendStatus(200);
	// res.sendFile(path.join(__dirname, '../client/index.html'));
});

express.get('/posts', function (req, res) {
	Post.query()
		.eager('user')
		.then(function (posts) {
			// console.log(posts)
			res.json({
				posts: posts
			});
		});
});

function needUserCreationMiddleware(req, res, next) {
	if (!req.user.anonymous) {
		next();
		return;
	}

	User.createAnonymousUser(req)
		.spread(function (user, tokens) {
			res.cookie('connect_token', tokens.connect_token.value, {maxAge: 86400000*90, httpOnly: true});
			req.userJustGotCreated = true;
			req.login(user, function (err) {
				if (err) { return next(err); }
				next();
			});
		})
		.catch(function (err) { console.log(err);});
}

express.post('/posts', needUserCreationMiddleware, function (req, res) {

	var data = {
		user_id: req.user.id,
		url: req.body.url,
		text: req.body.text,
		lat: parseFloat(req.body.lat),
		lng: parseFloat(req.body.lng)
	};
	Post.query()
		.insert(data)
		.then(function (newPost) {
			var json = {
				success: true,
				postId: newPost.id,
				_clientIdentifier: req.body._clientIdentifier
			};

			if (req.userJustGotCreated)
				json.newUser = req.user;

			res.json(json);
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
	requiredPostParamsMiddleware(['username', 'password']),
	function (req, res, next) {

		User.query()
			.first()
			.where({username: req.body.username, password: req.body.password})
			.then(function (user) {
				if (!user)
					return res.json(Responses.ValidationError({__global: ['Utilisateur ou mot de passe incorrect']}));
				req.login(user, function (err) {
					if (err) return res.json(Responses.SomethingError(err.name, err.message));
					return res.json(Responses.Success({user: user}));
				});
			})
			.catch(next);
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


express.use(function (err, req, res, next) {
	console.error(err);
	console.error(err.stack)
	res.status(500).send('Something broke!');
});
express.listen(8080);