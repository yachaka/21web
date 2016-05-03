
import Model from '@core/Model'
import { User } from '@models'

import Schemas from './schemas'

export default class Account extends Model {

	static get tableName() {
		return 'accounts'
	}

	static get schema() {
		return {
			provider: {
				presence: true
			},
			provider_id: Schemas.unsignedInteger,
			profile: {
				isObject: true
			},
			user_id: Schemas.unsignedInteger
		}
	}

	static get relationMappings() {
		return {
			user: {
				relation: Model.OneToOneRelation,
				modelClass: __dirname + '/User',
				join: {
					from: 'accounts.user_id',
					to: 'users.id'
				}
			}
		};
	}
}