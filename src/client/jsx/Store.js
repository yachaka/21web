
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import routerReducer from './reducers/Immutable+ReactReduxRouter'
import * as reducers from './reducers'

import thunk from 'redux-thunk'
import DevTools from './DevTools'

// Dev
import React from 'react'
import SharePost from './components/modals/SharePost.jsx'

export default createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    {
    	modal: <SharePost/>
    },
    compose(
    	applyMiddleware(thunk),
    	DevTools.instrument()
    )
);
