
// import request from 'request-promise'
import superagent from 'superagent'
import superagentPromisePlugin from 'superagent-promise-plugin'
const request = superagentPromisePlugin.patch(superagent);

import {commonErrorsHandler, default as wrap} from './Request'

/*****
* Modals
*****/
export const SET_MODAL = 'SET_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export function setModal(modal) {
	return {
		type: SET_MODAL,
		modal
	};
}

export function closeModal() {
	return {
		type: CLOSE_MODAL
	}
}

/******
* POSTS 
******/
export const NEW_POSTS = 'NEW_POSTS';

export function newPosts(posts) {
	return {
		type: NEW_POSTS,
		posts: posts
	}
}

/*******
* Users
****/
export const LOGIN = 'LOGIN';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';

export function login(username, password) {
	return function (dispatch)  {
		return wrap(
			request.post('/login')
			.type('form')
			.accept('json')
			.send({
				username: username,
				password: password
			})
		)
		.then(function (json) {
			dispatch(userLoggedIn(json.user));
			return json.user;
		});
	}
}

export function userLoggedIn(user) {
	return {
		type: USER_LOGGED_IN,
		user: user
	}
}


/*******
* ERRORS
****/
export const VALIDATION_ERROR  = 'ValidationError';

export function newValidationError(errors) {
	return {
		type: VALIDATION_ERROR,
		errors: errors
	}
}