
var objection = require('objection')
	, Model = require('objection').Model
	, User = require('./User')
	, ValidateObjectionBridge = require('../ValidateObjectionBridge');

function Post() {
	Model.apply(this, arguments);
}

Model.extend(Post);

Post.tableName = 'posts';
Post.schema = require('../../shared/schemas/PostSchema');
Post.prototype.$validate = ValidateObjectionBridge;
Post.relationMappings = {
	user: {
		relation: Model.OneToOneRelation,
		modelClass: User,
		join: {
			from: 'posts.user_id',
			to: 'users.id'
		}
	}
};


Post.prototype.$beforeInsert = function () {
  this.date = new Date().toISOString();
};

module.exports = Post;