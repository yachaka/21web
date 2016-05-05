
import Immutable from 'immutable'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import routerReducer from './reducers/Immutable+ReactReduxRouter'
import * as reducers from './reducers'

import thunk from 'redux-thunk'
import DevTools from './DevTools'

// Dev
import React from 'react'
import Login from './components/modals/Login.jsx'

const initialState = {};

for (let k in window.__INITIAL_STATE__) {
	initialState[k] = Immutable.fromJS(window.__INITIAL_STATE__[k]);
}

export default createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
   	initialState,
    compose(
    	applyMiddleware(thunk),
    	DevTools.instrument()
    )
);
