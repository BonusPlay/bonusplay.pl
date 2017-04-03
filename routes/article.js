var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('articles/index');
});

router.get('/re', function(req, res, next) {
	res.render('articles/re');
});

router.get('/rev1c1', function(req, res, next) {
	res.render('articles/rev1c1');
});

router.get('/rev1c2', function(req, res, next) {
	res.render('articles/rev1c2');
});

module.exports = router;