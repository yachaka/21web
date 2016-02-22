
var path = require('path');

var expressS = require('express')
	, express = expressS()
	, bodyParser = require('body-parser')

	, Model = require('objection').Model
	, Knex = require('knex');

var Post = require('./models/Post');


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

express.use(expressS.static(path.join(__dirname, '../client/dist/')));
express.use(bodyParser.urlencoded({ extended: false }));

express.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});

express.post('/posts', function (req, res) {
	var data = {
		user_id: 1,
		text: req.body.text,
		lat: parseFloat(req.body.lat),
		lng: parseFloat(req.body.lng)
	};

	Post.query()
		.insert(data)
		.then(function () {
			res.send('Ok');
		})
		.catch(function (err) {
			console.log(err.stack)
		});
});

express.listen(8080);