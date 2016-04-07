
module.exports = function needUserCreationMiddleware(req, res, next) {
	if (!req.user.anonymous) {
		next();
		return;
	}

	User.createAnonymousUser(req)
		.spread(function (user, tokens) {
			res.cookie('connect_token', tokens.connect_token.value, {maxAge: 86400000*90, httpOnly: true});
			req.userJustGotCreated = true;
			req.login(user, function (err) {
				if (err) { return next(err); }
				next();
			});
		})
		.catch(function (err) { console.log(err);});
};