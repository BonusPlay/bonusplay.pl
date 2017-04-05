var express = require('express');
var router = express.Router();

router.get('/github', function(req, res, next) {
	res.redirect('http://github.com/bonusplay3');
});

router.get('/discord', function(req, res, next) {
	res.redirect('https://discord.gg/tYk4PW5');
});

router.get('/youtube', function(req, res, next) {
	res.redirect('https://www.youtube.com/user/adamklis1975');
});

router.get('/facebook', function(req, res, next) {
	res.redirect('http://fb.com/bonusplay3');
});

router.get('/admin.php', function(req, res, next) {
	res.redirect('https://www.youtube.com/watch?v=kxopViU98Xo');
});

module.exports = router;