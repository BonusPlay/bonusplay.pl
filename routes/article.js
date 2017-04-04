var express = require('express');
var router = express.Router();

router.get('/re', function(req, res, next) {
	res.render('article/re');
});

router.get('/rev1c1', function(req, res, next) {
	res.render('article/re/v1c1');
});

router.get('/rev1c2', function(req, res, next) {
	res.render('article/re/v1c2');
});

module.exports = router;