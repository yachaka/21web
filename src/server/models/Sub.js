
var objection = require('objection')
	, Model = require('objection').Model
	, ValidateObjectionBridge = require('../ValidateObjectionBridge');

function Sub() {
	Model.apply(this, arguments);
}

Model.extend(Sub);

Sub.tableName = 'subs';
Sub.prototype.$validate = ValidateObjectionBridge;
Sub.relationMappings = {
	posts: {
		relation: Model.ManyToManyRelation,
		modelClass: __dirname + '/Post',
		join: {
			from: 'subs.id',
			through: {
				from: 'posts_to_subs.sub_id',
				to: 'posts_to_subs.post_id'
			},
			to: 'posts.id'
		}
	}
};


Sub.prototype.$beforeInsert = function () {
  this.created = new Date().toISOString();
};

module.exports = Sub;