
import Model from '@core/Model'
import { User, Preview } from '@models'

export default class Post extends Model {

	static get tableName() {
		return 'posts'
	}

	static get relationMappings() {
		return {
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
			},
			subs: {
				relation: Model.ManyToManyRelation,
				modelClass: __dirname + '/Sub',
				join: {
					from: 'posts.id',
					through: {
						from: 'posts_to_subs.post_id',
						to: 'posts_to_subs.sub_id'
					},
					to: 'subs.id'
				}
			}
		};
	}

	/* Hooks */
	beforeInsert() {
		this.date = new Date().toISOString();
	}
}
/*
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
	},
	subs: {
		relation: Model.ManyToManyRelation,
		modelClass: __dirname + '/Sub',
		join: {
			from: 'posts.id',
			through: {
				from: 'posts_to_subs.post_id',
				to: 'posts_to_subs.sub_id'
			},
			to: 'subs.id'
		}
	}
};

Post.create = function (post) {
};


Post.prototype.$beforeInsert = function () {
  this.date = new Date().toISOString();
};

module.exports = Post;*/