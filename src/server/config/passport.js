
import passport from 'passport'
import AnonymousStrategy from '@strategies/AnonymousStrategy'

import { Token, User } from '@models'

/** Serialization **/
/** /!\ In-Memory serialization for now /!\ */
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

/** Anonymous token strategy (connect without password) */
passport.use(new AnonymousStrategy({}, function (connectToken, done) {
	Token.query()
		.first()
		.where({
			type: 'connect',
			value: connectToken
		})
		.then(function (token) {
			if (!token)
				return null;
			
			return User.query()
				.first()
				.eager('tokens')
				.where('id', token.user_id);
		})
		.then(function (user) {
			done(null, user);
		})
		.catch(done);
}, function (ip, done) {
	User.query()
		.first()
		.where({unclaimed: true, last_ip_connected: ip})
		.eager('tokens')
		.then(function (user) {
			done(null, user);
		})
		.catch(done);
}));

export default passport