
var objection = require('objection')
	, Model = require('objection').Model;

function Post() {
	Model.apply(this, arguments);
}

Model.extend(Post);

Post.tableName = 'posts';

Post.jsonSchema = {
	type: 'object',
	required: ['user_id', 'url', 'text', 'lat', 'lng'],

	properties: {
		id: {type: 'integer'},
		user_id: {type: 'integer'},
		url: {type: 'string', minLength: 1},
		text: {type: 'string', minLength: 1},
		lat: {type: 'number'},
		lng: {type: 'number'},
		date: {type: 'date'}
	}
};

Post.prototype.$beforeValidate = function (jsonSchema, json, opt) {
	if (json.url) {
		if (!json.url.match(/(https?:\/\/[^\s]+)/))
			throw new objection.ValidationError({url: 'Must be a valid URL'});
	}

	return jsonSchema;
};

Post.prototype.$beforeInsert = function () {
  this.date = new Date().toISOString();
};

module.exports = Post;