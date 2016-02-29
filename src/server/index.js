
var path = require('path');

var expressS = require('express')
	, express = expressS()
	, consolidate = require('consolidate')
	, session = require('express-session')
	, cookieParser = require('cookie-parser')
	, bodyParser = require('body-parser')

	, passport = require('passport')
	, AnonymousStrategy = require('./strategies/AnonymousStrategy')

	, Model = require('objection').Model
	, Knex = require('knex');

var Post = require('./models/Post')
	, User = require('./models/User');

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

passport.use(new AnonymousStrategy({}, function (anonymousToken, done) {
	User.query()
		.where({anonymous: true, anonymous_token: anonymousToken})
		.then(function (users) {
			done(null, users[0]);
		})
		.catch(done);
}, function (ip, done) {
	User.query()
		.where({anonymous: true, last_ip_connected: ip})
		.then(function (users) {
			done(null, users[0]);
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



express.get('/', function (req, res) {
	console.log('user', req.user);
	res.render('index');
	// res.sendFile(path.join(__dirname, '../client/index.html'));
});

express.get('/posts', function (req, res) {
	Post.query()
		.then(function (posts) {
			console.log(posts)
			res.json({
				posts: posts
			});
		});
});
express.post('/posts', function (req, res) {
	var data = {
		user_id: 1,
		url: req.body.url,
		text: req.body.text,
		lat: parseFloat(req.body.lat),
		lng: parseFloat(req.body.lng)
	};

	Post.query()
		.insert(data)
		.then(function (newPost) {
			res.json({
				success: true,
				postId: newPost.id,
				_clientIdentifier: req.body._clientIdentifier
			});
		})
		.catch(function (err) {
			res.json({
				error: err
			});
		});
});

express.listen(8080);