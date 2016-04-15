
import { Model } from '@config/objection'

class MyModel extends Model {

}
MyModel.prototype.$validate = require('@ValidateObjectionBridge')

export default MyModel