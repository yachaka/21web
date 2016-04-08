
import { List } from 'immutable'

import { SET_MODAL, CLOSE_MODAL, NEW_POSTS } from '../actions'
import { combineReducers } from 'redux-immutable'

export function modal(state = null, action) {
	switch (action.type) {
		case SET_MODAL:
			return action.modal;
		case CLOSE_MODAL:
			return null;
		default:
			return state;
	}
}

export function posts(state = List([]), action) {
	switch (action.type) {
		case NEW_POSTS:
			return state.merge(action.posts);
		default:
			return state;
	}
}