'use strict';

var models = require('../');

exports.put = function(req, res, next) {
	if(!req.params.address)
		return res.status(422).json({error: {message: 'Must provide address'}});
	models.Visitor.findOne({
		where: {
			address: req.params.address
		}
	}).then(function (visitor, err) {
		if (err)
			return next(err);
		if (!visitor)
		{
			// CREATE
			models.Visitor.create({
				address: req.params.address,
				count: 1
			}).then(function(visitor) {
				return res.status(200).json(visitor);
			}).catch(function (err) {
				console.log(err);
				if(err)
					return res.status(422).json(err);
			});
		}
		else
		{
			// UPDATE
			visitor.count++;
			visitor.save().then(function(visitor, err) {
				if (err)
					return res.status(422).json(err);
				res.status(200).json(visitor);
			});
		}
	}).error(function(err) {
		console.log(err);
		res.status(403).send('Forbidden');
	});
};