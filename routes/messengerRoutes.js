'use strict';

var express 	= require('express');
var config 		= require('../config');
var messenger 	= require('../helpers/messengerHelper');

var router = express.Router();

router.get('/', function (req, res) {
	if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.messenger.validationToken)
		res.status(200).send(req.query['hub.challenge']);
	else 
		res.sendStatus(403);
});

router.post('/', function (req, res) {
	var data = req.body;
	if (data.object == 'page') {
		data.entry.forEach(function (pageEntry) {
			var pageID = pageEntry.id;
			var timeOfEvent = pageEntry.time;

			pageEntry.messaging.forEach(function (messagingEvent) {
				if (messagingEvent.optin)
					messenger.receivedAuthentication(messagingEvent);
				else if (messagingEvent.message)
					messenger.receivedMessage(messagingEvent);
				else if (messagingEvent.delivery)
					messenger.receivedDeliveryConfirmation(messagingEvent);
				else if (messagingEvent.postback)
					messenger.receivedPostback(messagingEvent);
				else if (messagingEvent.read)
					messenger.receivedMessageRead(messagingEvent);
				else if (messagingEvent.account_linking)
					console.log("Webhook received accountLinking messagingEvent: ", messagingEvent);
				else
					console.log("Webhook received unknown messagingEvent: ", messagingEvent);
			});
		});
		res.sendStatus(200);
	}
});

/*
router.get('/authorize', function(req, res) {
var accountLinkingToken = req.query['account_linking_token'];
var redirectURI = req.query['redirect_uri'];

// Authorization Code should be generated per user by the developer. This will
// be passed to the Account Linking callback.
var authCode = "VERYTEMPAUTHCODE";

var redirectURISuccess = redirectURI + "&authorization_code=" + authCode;

res.render('authorize', {
accountLinkingToken: accountLinkingToken,
redirectURI: redirectURI,
redirectURISuccess: redirectURISuccess
});
});
 */

module.exports = router;
