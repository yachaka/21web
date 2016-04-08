
import { Map } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

let initialRouterData = Map({
    locationBeforeTransitions: null
});

export default function routerReducer(state = initialRouterData, { type, payload } = {}) {
    if (type === LOCATION_CHANGE) {
        return state.set('locationBeforeTransitions', payload);
    }
    return state;
}