
import request from './request'

import {commonErrorsHandler, default as wrap} from './WrappedRequest'

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

export function sharePost(post, toSubs) {
	return function (dispatch) {
		let sent = {
			...post,
			subs: toSubs
		};

		return wrap(
			request.post('/posts')
			.type('form')
			.accept('json')
			.send(sent)
		);
	}
}

/*******
* Users
****/
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
/*
* @throws error: an error defined in /shared/errors
* @returns logged user data
*/	
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

export function logout() {
	return function (dispatch) {
		return wrap(
			request.get('/logout')
		)
		.then((res) => {
			dispatch(userLoggedIn({}));
			return res;
		});
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