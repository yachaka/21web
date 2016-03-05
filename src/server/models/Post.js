
var objection = require('objection')
	, Model = require('objection').Model
	, ValidateObjectionBridge = require('../ValidateObjectionBridge');

function Post() {
	Model.apply(this, arguments);
}

Model.extend(Post);

Post.tableName = 'posts';
Post.schema = require('../../shared/schemas/PostSchema');
Post.prototype.$validate = ValidateObjectionBridge;

Post.prototype.$beforeInsert = function () {
  this.date = new Date().toISOString();
};

module.exports = Post;