'use strict';

var express = require('express');
var request = require('request');
var config	= require('../config');

var router = express.Router();

router.use('/project', require('./projectRoutes'));

router.get('/', function(req, res) {
	res.render('index', { page: 'home' });
});

router.get('/about', function(req, res) {
	res.render('about', { page: 'about' });
});

router.get('/contact', function(req, res) {
	res.render('contact', { page: 'contact' });
});

router.get('/gachi', function(req, res) {
	res.render('gachi');
});

router.all('*', function(req, res) {
	res.render('404', {
		msg: 'Not Found'
	});
});

module.exports = router;