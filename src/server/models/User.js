
var objection = require('objection')
	, Model = objection.Model
	, randomString = require('random-string')
	, Promise = require('bluebird')
	, ValidateObjectionBridge = require('../ValidateObjectionBridge')

	, Token = require('./Token');

function User() {
	Model.apply(this, arguments);
}

Model.extend(User);

User.tableName = 'users';
User.schema = {
	username: {
		presence: true,
		format: {
			pattern: "[a-z0-9]+",
			flags: "i",
			message: "can only contain a-z and 0-9"
		},
		length: {
			minimum: 3,
			maximum: 25
		}
	},
	password: {
		length: {
			minimum: 8,
			maximum: 20
		}
	}
};
User.prototype.$validate = ValidateObjectionBridge;
User.relationMappings = {
	tokens: {
		relation: Model.OneToManyRelation,
		modelClass: __dirname + '/Token',
		join: {
			from: 'users.id',
			to: 'tokens.user_id'
		}
	},
	permissions: {
		relation: Model.OneToManyRelation,
		modelClass: __dirname + '/Permission',
		join: {
			from: 'users.id',
			to: 'user_permissions.user_id'
		}
	}
};

User.createAnonymousUser = function (req, fields) {
	if (!fields)
		fields = {};
	fields.unclaimed = true;
	fields.username = 'anonymous'+Math.ceil(Math.random()*1000000);
	fields.last_ip_connected = req.ip;

	return objection.transaction(User, Token, function (User, Token) {

		var userInsert = User.query().insert(fields).then(function (user) { return user;});
		var tokensInsert = userInsert.then(function (createdUser) {
			return Promise.props({
				connect_token: Token.query().insert({
					type: 'connect',
					user_id: createdUser.id
				}),
				claim_token: Token.query().insert({
					type: 'claim',
					user_id: createdUser.id
				})
			});
		});

		return Promise.all([
			userInsert,
			tokensInsert
		]);
	});
};

/*****
* LIFECYCLE CALLBACKS
******/
User.prototype.$beforeInsert = function () {
	this.created = new Date().toISOString();
};

module.exports = User;