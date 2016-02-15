
var http = require('http');

var Twitter = function (key, secret) {
	this._baseRequestParams = {
		protocol: 'https:',
		host: 'api.twitter.com',
		path: '/1.1'

	this._key = key;
	this._secret = secret;

	this.bearerToken = null;
};

Twitter.prototype.getBearerToken = function () {
	return new Promise(function (resolve, reject) {
		http.request({

		})
	})
};

Twitter.prototype.request = function (endpoint, method, params, callback) {
	return http.request({
		protocol: 'https:',
		host: 'api.twitter.com',
		path: '/1.1' + endpoint,
		headers:
	})
};