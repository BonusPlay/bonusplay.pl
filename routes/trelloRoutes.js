'use strict';

var express = require('express');
var crypto 	= require('crypto');
var trello 	= require('../helpers/trelloHelper');

var router = express.Router();

router.get('/', function (req, res) {
	//verifyTrelloWebhookRequest(req, config.trello.secret, 'https://api.thebonusplay.pl/trello');
	if (req.body == null) {
		res.sendStatus(400);
		return;
	}
	
	res.sendStatus(200);
});

router.post('/', function (req, res) {
	//verifyTrelloWebhookRequest(req, config.trello.secret, 'https://api.thebonusplay.pl/trello');
	if (req.body == null) {
		res.sendStatus(400);
		return;
	}

	trello(req.body);
	res.sendStatus(200);
});

function verifyTrelloWebhookRequest(request, secret, callbackURL) {
	var base64Digest = function (s) {
		return crypto.createHmac('sha1', secret).update(s).digest('base64');
	}
	var content = request.body + callbackURL;
	console.log(content);
	var doubleHash = base64Digest(base64Digest(content));
	var headerHash = base64Digest(request.headers['x-trello-webhook']);
	return doubleHash == headerHash;
}

module.exports = router;