var path            = require('path');
var logger          = require('morgan');

var express         = require('express');
var subdomain       = require('express-subdomain');
var rateLimiter     = require('express-rate-limit');
var favicon         = require('serve-favicon');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');

var app = express();

app.use(rateLimiter({
	windowMs: 60*1000,
	max: 100,
	delayMs: 0
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(subdomain('api', require('./routes/api')));
app.use('/', require('./routes'));

app.use(function(req, res, next) {
	res.render('404');
});

app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;