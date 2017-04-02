'use strict';

var express 		= require('express');
var subdomain 		= require('express-subdomain');
var rateLimiter		= require('express-rate-limit');
var favicon 		= require('serve-favicon');
var logger 			= require('morgan');
var bodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');

var app = express();

var limiter = new rateLimiter({
	windowMs: 60*1000,
	max: 100,
	delayMs: 0
});
app.use(limiter);
app.set('views', './views');
app.set('view engine', 'pug');

app.use(favicon('./public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

app.use(subdomain('api', require('./routes/apiSSL')));
app.use('/', require('./routes'));

if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;