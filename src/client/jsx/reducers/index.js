
import { List, Map } from 'immutable'

import { SET_MODAL, CLOSE_MODAL, NEW_POSTS, USER_LOGGED_IN } from '../actions'
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

export function user(state = Map({anonymous: 1}), action) {
	switch (action.type) {
		case USER_LOGGED_IN:
			return Map(action.user);
		default:
			return state;
	}
}