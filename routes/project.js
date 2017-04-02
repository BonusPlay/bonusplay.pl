var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('projects/index');
});

router.get('/snake', function(req, res, next) {
	res.render('projects/snake');
});

module.exports = router;