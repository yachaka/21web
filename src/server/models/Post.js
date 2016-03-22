
var objection = require('objection')
	, Model = require('objection').Model
	, User = require('./User')
	, Preview = require('./Preview')
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
	},
	preview: {
		relation: Model.OneToOneRelation,
		modelClass: Preview,
		join: {
			from: 'posts.preview_id',
			to: 'previews.id'
		}
	}
};


Post.prototype.$beforeInsert = function () {
  this.date = new Date().toISOString();
};

module.exports = Post;