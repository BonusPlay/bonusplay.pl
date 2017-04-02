'use strict';

var express = require('express');
var config 	= require('../config');
var helper 	= require('../helpers/messenger.js');

var router 	= express.Router();

router.get('/', function(req, res) {
	if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === <VERIFY_TOKEN>)
	{
		console.log("Validating webhook");
		res.status(200).send(req.query['hub.challenge']);
	}
	else
	{
		console.error("Failed validation. Make sure the validation tokens match.");
		res.sendStatus(403);          
	}
});

router.post('/', function (req, res) {
	var data = req.body;
	if (data.object == 'page')
	{
		data.entry.forEach(function (pageEntry) {
			var pageID = pageEntry.id;
			var timeOfEvent = pageEntry.time;

			pageEntry.messaging.forEach(function (messagingEvent) {
				if (messagingEvent.optin)
					helper.receivedAuthentication(messagingEvent);
				else if (messagingEvent.message)
					helper.receivedMessage(messagingEvent);
				else if (messagingEvent.delivery)
					helper.receivedDeliveryConfirmation(messagingEvent);
				else if (messagingEvent.postback)
					helper.receivedPostback(messagingEvent);
				else if (messagingEvent.read)
					helper.receivedMessageRead(messagingEvent);
				else if (messagingEvent.account_linking)
					console.log("Webhook received accountLinking messagingEvent: ", messagingEvent);
				else
					console.log("Webhook received unknown messagingEvent: ", messagingEvent);
			});
		});
		res.sendStatus(200);
	}
});

module.exports = router;