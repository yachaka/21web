
var Model = require('objection').Model;

function Post() {
	Model.apply(this, arguments);
}

Model.extend(Post);

Post.tableName = 'posts';

Post.jsonSchema = {
	type: 'object',
	required: ['user_id', 'text', 'lat', 'lng'],

	properties: {
		id: {type: 'integer'},
		user_id: {type: 'integer'},
		text: {type: 'string', minLength: 1},
		lat: {type: 'number'},
		lng: {type: 'number'},
		date: {type: 'date'}
	}
};


Post.prototype.$beforeInsert = function () {
  this.date = new Date().toISOString();
};

module.exports = Post;