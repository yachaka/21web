
import { * } form '../middlewares'

module.exports = function (express) {

	express.post('/posts', onlyAjaxMiddleware, needUserCreationMiddleware, function (req, res) {
		var data = {
			user_id: req.user.id,
			url: req.body.url,
			text: req.body.text,
			lat: parseFloat(req.body.lat),
			lng: parseFloat(req.body.lng)
		};
		Post.query()
			.insert(data)
			.then(function (newPost) {
				var json = {
					success: true,
					postId: newPost.id,
					_clientIdentifier: req.body._clientIdentifier
				};

				if (req.userJustGotCreated)
					json.newUser = req.user;

				res.json(json);
			})
			.catch(function (err) {
				console.log(err.stack);
				res.json({
					errors: err.data
				});
			});
	});

};