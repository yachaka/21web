
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import routerReducer from './reducers/Immutable+ReactReduxRouter'
import * as reducers from './reducers'

import thunk from 'redux-thunk'
import DevTools from './DevTools'

// Dev
import React from 'react'
import Login from './components/modals/Login.jsx'

export default createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    {
    	modal: <Login/>
    },
    compose(
    	applyMiddleware(thunk),
    	DevTools.instrument()
    )
);
