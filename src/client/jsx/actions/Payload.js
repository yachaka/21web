
var ActionsType = require('./');

module.exports = function (name, payload) {
	payload = payload || {};
	payload.type = ActionsType(name);
	return payload;
}