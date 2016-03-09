
var objection = require('objection')
	, Model = require('objection').Model
	, User = require('./User')
	, ValidateObjectionBridge = require('../ValidateObjectionBridge')
	, randomString = require('random-string');

function Token() {
	Model.apply(this, arguments);
}

Model.extend(Token);

Token.tableName = 'tokens';
Token.schema = require('../../shared/schemas/TokenSchema');
Token.prototype.$validate = ValidateObjectionBridge;
Token.relationMappings = {
	user: {
		relation: Model.OneToOneRelation,
		modelClass: __dirname + '/User',
		join: {
			from: 'tokens.user_id',
			to: 'users.id'
		}
	}
};

Token.prototype.$beforeInsert = function () {
	this.value = randomString({length: 32});
	this.issued = new Date().toISOString();
};


module.exports = Token;