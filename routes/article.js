var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('articles/index', { css: 'article' });
});

router.get('/re', function(req, res, next) {
	res.render('articles/re', { css: 'article' });
});

router.get('/rev1c1', function(req, res, next) {
	res.render('articles/rev1c1', { css: 'article' });
});

router.get('/rev1c2', function(req, res, next) {
	res.render('articles/rev1c2', { css: 'article' });
});

module.exports = router;