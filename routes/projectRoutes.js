'use strict';

var express = require('express');
var request = require('request');
var config 	= require('../config');
var models 	= require('../models');

var router = express.Router();

router.get('/MessengerBonusBot', function(req, res) {
	res.render('project', {
		projectName: 'Messenger BonusBot',
		projectDesc: 'Messenger bot with utility and quality of life commands',
		projectLang: 'NodeJS',
		projectLink: 'http://m.me/TheBonusBot'
	});
});

router.get('/kick-o-meter', function(req, res) {
	models.Kicked.findAll().then(function(kickeds) {
		res.render('kick-o-meter', { 
			projectName: 'kick-o-meter',
			projectDesc: 'counts how many times teamspeak3 user got kicked',
			projectLang: 'C, JavaScript',
			kickeds: kickeds
		});
	});
});

router.get('/landmarks', function(req, res) {
	models.Landmark.findOne({
		where: {
			verified: false
		}
	}).then(function(landmark) {
	var data = {
		landmarkId: landmark.id,
		landmarkName: landmark.name,
		landmarkImage: landmark.picture,
		landmarkAddress: landmark.address,
		landmarkDescription: landmark.description,
		landmarkHours: landmark.hours,
		landmarkComments: landmark.comments,
		landmarkRating: landmark.rating
	};
		
	res.render('landmark', data);
	});
});
				
router.get('/:name', function(req, res) {
	request.get({
		url: 'https://api.github.com/repos/BonusPlay3/' + req.params.name,
		Authorization: 'token ' + config.github.token,
		headers: { 'User-Agent': 'TheBonusPlay' }
	}, function(err, res1, body1) {
		if(err)
			throw err;
		if(JSON.parse(body1).message === 'Not Found')
		{
			res.render('404', {
				msg: 'NOT FOUND'
			});
		}
		else
		{
			var proj = JSON.parse(body1);
			
			request.get({
			url: 'https://api.github.com/repos/BonusPlay3/' + req.params.name + '/releases/latest',
			Authorization: 'token ' + config.github.token,
			headers: { 'User-Agent': 'TheBonusPlay' }
			}, function(err, res2, body2) {
				if(err)
					throw err;
				
				if(JSON.parse(body2).message === 'Not Found')
				{
					res.render('project', {
						projectName: proj.name,
						projectDesc: proj.description,
						projectLang: proj.language,
						projectLink: proj.html_url
					});
					return;
				}
				
				var release = JSON.parse(body2);
				
				res.render('project', {
					projectName: proj.name,
					projectDesc: proj.description,
					projectLang: proj.language,
					projectLink: proj.html_url,
					projectVer : release.tag_name,
					projectDown: release.assets[0].browser_download_url
				});
			});
		}
	});
});

module.exports = router;