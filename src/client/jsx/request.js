
import superagent from 'superagent'
import superagentPromisePlugin from 'superagent-promise-plugin'
export default superagentPromisePlugin.patch(superagent);