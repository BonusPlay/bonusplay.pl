'use strict';

var express = require('express');
var path 	= require('path');

var router = express.Router();

router.get('/', function (req, res) {
	res.send('Welcome to BonusPlay API');
});

// router.get('/messenger', require('./messenger'));

router.all('*', function (req, res) {
	res.status(404).send('API interface not found');
});

module.exports = router;