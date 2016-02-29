
var Model = require('objection').Model
	, randomString = require('random-string');

function User() {
	Model.apply(this, arguments);
}

Model.extend(User);

User.tableName = 'users';

User.jsonSchema = {
	type: 'object',
	required: ['anonymous'],

	properties: {
		id: {type: 'integer'},
		anonymous: {type: 'boolean'},
		username: {type: 'string', minLength: 3},
		password: {type: 'string', minLength: 8},
		last_ip_connected: {type: 'string'},
		anonymous_token: {type: 'string', minLength: 32, maxLength: 32},
		claim_token: {type: 'string', minLength: 32, maxLength: 32},
		created: {type: 'date'}
	}
};


User.createAnonymousUser = function (fields) {
	if (!fields)
		fields = {};
	fields.anonymous_token = randomString({length: 32});
	fields.claim_token = randomString({length: 32});
	return User.query()
			.insert(fields);
};

/*****
* LIFECYCLE CALLBACKS
******/
User.prototype.$beforeInsert = function () {
	this.created = new Date().toISOString();
};

module.exports = User;