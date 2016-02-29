
var util = require('util')
  , Strategy = require('passport-strategy');

function AnonymousStrategy(options, verifyCookie, verifyIp) {
	if (!verifyCookie) { throw new TypeError('AnonymousStrategy requires a verifyCookie callback'); }
	if (!verifyIp) { throw new TypeError('AnonymousStrategy requires a verifyIp callback'); }

	this._anonymousTokenCookie = options.anonymousTokenCookie || 'anonymous_token';

	Strategy.call(this);
	this.name = 'anonymous';
	this._verifyCookie = verifyCookie;
	this._verifyIp = verifyIp;
}

util.inherits(AnonymousStrategy, Strategy);


AnonymousStrategy.prototype.authenticate = function (req) {
	var self = this;

	if (req.user) {
		this.pass();
		return ;
	}

	function verified(err, user) {
		if (err) { self.fail(err); }
		if (!user)
			user = 'anonymous';
		self.success(user);
	}

	if (req.cookies && req.cookies[this._anonymousTokenCookie]) {
		this._verifyCookie(req.cookies[this._anonymousTokenCookie], verified);
	}

	this._verifyIp(req.ip, verified);
};

module.exports = AnonymousStrategy;