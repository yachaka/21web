
import passport from 'passport'
import AnonymousStrategy from '@strategies/AnonymousStrategy'
import InstagramStrategy from 'passport-instagram'

import { Account } from '@models'

function AccountLogin(accessToken, refreshToken, profile, done) {
	Account.query()
		.first()
		.where({
			provider: profile.provider,
			provider_id: profile.id
		})
		.eager('user')
		.then((account) => {
			if (!account) {
				return Account.query()
					.insertWithRelated({
						provider: profile.provider,
						provider_id: profile.id,
						profile: JSON.stringify(profile),
						user: {
							username: profile.displayName
						}
					})
					.then((res) => {
						console.log(res);
						return res.user;
					});
			}
			return account.user;
		})
		.then((user) => {
			done(null, user);
		})
		.catch(done);
}

/** Serialization **/
/** /!\ In-Memory serialization for now /!\ */
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new InstagramStrategy({
	clientID: '3377cfbcbdc64219ae33ecd24b5e0539',
	clientSecret: 'c2d54a520e8a47c1bee610581c49f2ad',
	callbackURL: 'http://localhost:8080/auth/instagram/callback'
}, AccountLogin));

/** Anonymous token strategy (connect without password) */
// passport.use(new AnonymousStrategy({}, function (connectToken, done) {
// 	Token.query()
// 		.first()
// 		.where({
// 			type: 'connect',
// 			value: connectToken
// 		})
// 		.then(function (token) {
// 			if (!token)
// 				return null;
			
// 			return User.query()
// 				.first()
// 				.eager('tokens')
// 				.where('id', token.user_id);
// 		})
// 		.then(function (user) {
// 			done(null, user);
// 		})
// 		.catch(done);
// }, function (ip, done) {
// 	User.query()
// 		.first()
// 		.where({unclaimed: true, last_ip_connected: ip})
// 		.eager('tokens')
// 		.then(function (user) {
// 			done(null, user);
// 		})
// 		.catch(done);
// }));

export default passport