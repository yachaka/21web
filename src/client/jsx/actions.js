

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
// export const LOGIN = 'LOGIN';

// export function login(username, password) {
// 	return {
// 		type: LOGIN
// 	}
// }