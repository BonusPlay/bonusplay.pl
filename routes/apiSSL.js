'use strict';

var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
	res.send('Welcome to BonusPlay API');
});

router.get('/counterbonus', function(req, res) {
	res.send(require('../config/counterbonus'));
});
// router.use('/messenger', require('./messenger'));

router.all('*', function (req, res) {
	res.status(404).send('API interface not found');
});

module.exports = router;