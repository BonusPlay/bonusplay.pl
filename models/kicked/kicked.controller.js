'use strict';

var models 		= require('../');
var bodyParser 	= require('body-parser');

exports.get = function(req, res, next) {
	res.status(200).json({ version: '1.0.0' });
}

exports.post = function(req, res, next) {
	console.log('kickedName: ' + req.body.kickedName);
	console.log('kickedId: ' + req.body.kickedId);
	console.log('kickerName: ' + req.body.kickerName);
	
	models.Kicked.findOne({
		where: {
			kickedId: req.body.kickedId
		}
	}).then(function (kicked, err) {
		if (err)
			return next(err);
		if (!kicked)
		{
			// CREATE
			models.Kicked.create({
				kickedName: req.body.kickedName,
				kickedId: req.body.kickedId,
				kickerName: req.body.kickerName,
				count: 1
			}).then(function(kicked) {
				return res.status(200).end();
			}).catch(function (err) {
				console.log(err);
				if(err)
					return res.status(422).json(err);
			});
		}
		else
		{
			// UPDATE
			kicked.count++;
			kicked.save().then(function(kicked, err) {
				if (err)
					return res.status(422).json(err);
				res.status(200).end();
			});
		}
	}).error(function(err) {
		console.log(err);
		res.status(403).send('Forbidden');
	});
};