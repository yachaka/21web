
var reqwest = require('reqwest');

var objection = require('objection')
	, Model = require('objection').Model
	, User = require('./User')
	, ValidateObjectionBridge = require('../ValidateObjectionBridge');

var IFRAMELY_API_KEY = 'dd617885f41ea9e7690ce7';
var IFRAMELY_API_URL = 'http://iframe.ly/api/iframely';

function Preview() {
	Model.apply(this, arguments);
}

Model.extend(Preview);

Preview.tableName = 'previews';
// Post.schema = require('../../shared/schemas/PostSchema');
// Post.prototype.$validate = ValidateObjectionBridge;
// Post.relationMappings = {
// 	user: {
// 		relation: Model.OneToOneRelation,
// 		modelClass: User,
// 		join: {
// 			from: 'posts.user_id',
// 			to: 'users.id'
// 		}
// 	}
// };

Preview.retrievePreview = function (url) {
	return Preview.query()
		.first()
		.where({url: url})
		.then(function (preview) {

			if (preview)
				return preview;
			else {
				return reqwest({
						url: IFRAMELY_API_URL,
						method: 'get',
						data: [
							{name: 'url', value: url},
							{name: 'api_key', value: IFRAMELY_API_KEY},
							{name: 'media', value: true}, // Prefer Media-only previews, @see Iframely API Docs
							{name: 'omit_script', value: true} // Omit script embed.js as it is loaded in base page @see Iframely API Docs
						],
						type: 'json'
					})
					.then(function (json) {
						return Preview.query()
							.insert({
								url: json.url,
								canonical: json.meta.canonical,
								author: json.meta.author,
								author_url: json.meta.author_url,
								provider: json.meta.site,
								html: json.html
							});
					});
			}
		});
};


Preview.prototype.$beforeInsert = function () {
  this.issued = new Date().toISOString();
};

module.exports = Preview;