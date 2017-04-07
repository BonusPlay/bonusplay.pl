var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/', require('./redirects'));
router.use('/article', require('./article'));
router.use('/project', require('./project'));

module.exports = router;
