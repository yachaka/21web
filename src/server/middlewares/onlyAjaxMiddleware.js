
module.exports = function (req, res, next) {
	if (!req.xhr)
		return next('route');
	next();
};