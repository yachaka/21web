
import cfg from '@config'
import Model from '@core/Model'

import MakeIframelyRequest from '@MakeIframelyRequest'

export default class Preview extends Model {

	static get tableName() {
		return 'previews'
	}

	static get jsonAttributes() {
		return ['json'];
	}

	static get relationMappings() {
		return {
			posts: {
				relation: Model.OneToManyRelation,
				modelClass: __dirname + '/Post',
				join: {
					from: 'previews.id',
					to: 'posts.preview_id'
				}
			}
		}
	}

	static retrievePreview(forUrl) {
		return Preview.query()
		.first()
		.where('url', forUrl)
		.then(function (preview) {

			if (preview) /* Preview found */
				return preview;
			else { /* Generating one */
				return MakeIframelyRequest(forUrl)
					.then(function (json) {
						return Preview.query()
							.insert({
								url: json.url,
								canonical: json.meta.canonical,
								author: json.meta.author,
								author_url: json.meta.author_url,
								provider: json.meta.site,
								html: json.html,
								json: json
							});
					});
			}
		});
	}

	/* Hooks */
	$beforeInsert() {
		this.issued = new Date().toISOString();
	}
}