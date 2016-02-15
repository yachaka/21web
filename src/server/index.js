
var express = require('express')()
	, Twitter = require('twitter');

var TwitterConfig = require('./config/Twitter');

/**
* Twitter Application Token
*/
var TwitterToken = null;
express.use(function (req, res, next) {
	if (TwitterToken)
		return next();
	var client = new Twitter({
		consumer_key: TwitterConfig.key,
		consumer_secret: TwitterConfig.secret
	});
	client.get('statuses/show', {id: '699190872844406784'}, function (error, tweet, response) {
		console.log(error);
		console.log(tweet);
		// console.log(response);
	});
	next();
})

express.get('/', function (req, res) {

	res.send('Ok');

});

express.listen(8080);