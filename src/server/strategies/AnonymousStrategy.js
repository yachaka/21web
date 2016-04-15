
var util = require('util')
  , Strategy = require('passport-strategy');

function AnonymousStrategy(options, verifyCookie, verifyIp) {
	if (!verifyCookie) { throw new TypeError('AnonymousStrategy requires a verifyCookie callback'); }
	if (!verifyIp) { throw new TypeError('AnonymousStrategy requires a verifyIp callback'); }

	this._connectTokenCookie = options.connectTokenCookie || 'connect_token';

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
		if (err) { 
			console.log(err.stack);
			self.fail(err);
		}
		if (!user)
			user = {anonymous: 1};
		self.success(user);
	}

	if (req.cookies && req.cookies[this._connectTokenCookie]) {
		this._verifyCookie(req.cookies[this._connectTokenCookie], verified);
	} else
		this._verifyIp(req.ip, verified);
};

module.exports = AnonymousStrategy;