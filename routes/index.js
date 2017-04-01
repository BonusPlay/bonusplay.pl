var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/snake', function(req, res, next) {
	res.render('snake');
});

router.use('/article', require('./article'));

router.get('/admin.php', function(req, res, next) {
	res.redirect('https://www.youtube.com/watch?v=kxopViU98Xo');
});

router.get('*', function(req, res) {
	res.render('404');
});

module.exports = router;