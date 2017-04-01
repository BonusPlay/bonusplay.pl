'use strict';

var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
	res.send('Welcome to BonusPlay API');
});

//router.use('/visitors', require('../models/visitor'));
//router.use('/kick-o-meter', require('../models/kicked'));
//router.use('/kick-o-meter', require('./kick-o-meterRoutes'));
router.use('/messenger', require('./messengerRoutes'));
//router.use('/trello', require('./trelloRoutes'));
router.get('/radio', function (req, res) {
	res.render('radio');
});

router.get('*', function (req, res) {
	res.status(404).send('API interface not found');
});

module.exports = router;