
import path from 'path'
import expressjs from 'express'

import consolidate from 'consolidate'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from './passport'

const express = expressjs();
export default express;

/*******
* View Engine configuration - Jade
*******/
express.engine('jade', consolidate.jade);
express.set('view engine', 'jade');
express.set('views', path.join(__dirname, '../../client/views'));

/********
* MIDDLEWARES
*****/
express.use(expressjs.static(path.join(__dirname, '../../dist/'))); 								/* Static files */
express.use(cookieParser()); 																		/* Cookies */
express.use(bodyParser.urlencoded({ extended: false })); 											/* Form body */
express.use(session({secret: '21Locate sisi les potos', resave: false, saveUninitialized: true}));	/* Session */
express.use(passport.initialize());																	/* PassportJS */
express.use(passport.session());																	/* Passport Session */
// express.use(passport.authenticate('anonymous'));													/* Passport AnonymousStrategy(custom) */
express.use(function (req, res, next) {																/* Setting user local for view */
	
	/* TMP  DEVVV */
	var User = require('@models/User');
	User.query()
	.first()
	.where('id', 42)
	.then((user) => {
		res.locals.user = user;
		req.login(user, next);
	});
});