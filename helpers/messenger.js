var config 		= require('../config');
var messages 	= require('../config/messages');
var twitch 		= require('../config/twitchEmotes');
var request 	= require('request');
var crypto		= require('crypto');
var colors 		= require('colour');
var bodyParser 	= require('body-parser');

function verifyRequestSignature (req, res, buf) {
	var signature = req.headers["x-hub-signature"];
	if (!signature)
		throw new Error("Couldn't validate the request signature.");
	else
	{
		var elements = signature.split('=');
		var method = elements[0];
		var signatureHash = elements[1];

		var expectedHash = crypto.createHmac('sha1', (config.messenger.appSecret).update(buf).digest('hex'));

		if (signatureHash != expectedHash)
			throw new Error("Couldn't validate the request signature.");
	}
}

/*
 * Authorization Event
 *
 * The value for 'optin.ref' is defined in the entry point. For the "Send to 
 * Messenger" plugin, it is the 'data-ref' field. Read more at 
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/authentication
 *
 */
var receivedAuthentication = function (event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfAuth = event.timestamp;

	// The 'ref' field is set in the 'Send to Messenger' plugin, in the 'data-ref'
	// The developer can set this to an arbitrary value to associate the 
	// authentication callback with the 'Send to Messenger' click event. This is
	// a way to do account linking when the user clicks the 'Send to Messenger' 
	// plugin.
	var passThroughParam = event.optin.ref;

	// console.log("Received authentication for user %d and page %d with pass through param '%s' at %d", senderID, recipientID, passThroughParam, timeOfAuth);

	sendTextMessage(senderID, "Authentication successful");
}

var receivedMessage = function (event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfMessage = event.timestamp;
	var message = event.message;
		
	// console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
	// console.log(JSON.stringify(message));

	var isEcho = message.is_echo;
	var messageId = message.mid;
	var appId = message.app_id;
	var metadata = message.metadata;

	var messageText = message.text;
	var messageAttachments = message.attachments;
	var quickReply = message.quick_reply;

	if (isEcho)
	{
		// console.log("Received echo for message %s and app %d with metadata %s", messageId, appId, metadata);
		return;
	}
	else if (quickReply)
	{
		var quickReplyPayload = quickReply.payload;
		// console.log("Quick reply for message %s with payload %s", messageId, quickReplyPayload);
		sendTextMessage(senderID, "Quick reply tapped");
		return;
	}
		
	if (messageText)
	{
		if(messageText === '/help')
		{
			var text = 'Avalible commands:\n';
			for(var i = 0; i < messages.commands.length; i++)
			{
				text = text + messages.commands[i].name + '\n';
			}
			executeCommand(senderID, messages.other.help);
			sendTextMessage(senderID, text);
			return;
		}
		
		if(messageText === '/debug')
		{
			executeCommand(senderID, messages.other.debug);
			return;
		}
		
		for(var i = 0; i < messages.commands.length; i++)
		{
			if(messages.commands[i].name === messageText)
			{
				executeCommand(senderID, messages.commands[i]);
				return;
			}
		}
		
		if(twitch.emotes.hasOwnProperty(messageText))
		{
			var command = twitch.emotes[messageText];
			command.type = 'emote';
			executeCommand(senderID, command);
			return;
		}
		
		if(messageText.charAt(0) === '/')
			sendTextMessage(senderID, 'Unknown command "' + messageText.substr(1) + '". Type in "/help" for more information.')
		else
			sendTextMessage(senderID, messageText);
	}
	else if (messageAttachments)
		sendTextMessage(senderID, "Message with attachment received. And what am I supposed to do with that?!");
}

var receivedPostback = function (event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfPostback = event.timestamp;
	var payload = event.postback.payload;
	
	for(var i = 0; i < messages.payloads.length; i++)
	{
		if(messages.payloads[i].name === payload)
			executeCommand(senderID, messages.payloads[i]);
		else
			throw new Error('Recived unknown payload');
	}
}

var receivedDeliveryConfirmation = function (event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var delivery = event.delivery;
	var messageIDs = delivery.mids;
	var watermark = delivery.watermark;
	var sequenceNumber = delivery.seq;
	
	if (messageIDs)
	{
		messageIDs.forEach(function(messageID) {
		// console.log("Received delivery confirmation for message ID: %s", messageID);
		});
	}
		// console.log("All message before %d were delivered.", watermark);
}

var receivedMessageRead = function (event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var watermark = event.read.watermark;
	var sequenceNumber = event.read.seq;
	
	// console.log("Received message read event for watermark %d and sequence number %d", watermark, sequenceNumber);
}

var executeCommand = function (senderID, command) {
	switch (command.type)
	{
	case 'text':
		sendTextMessage(senderID, command.message);
		break;
	case 'image':
		sendImageMessage(senderID, command.message);
		break;
	case 'audio':
		sendAudioMessage(senderID, command.message);
		break;
	case 'video':
		sendVideoMessage(senderID, command.message);
		break;
	case 'file':
		sendFileMessage(senderID, command.message);
		break;
	case 'generic':
		sendGenericMessage(senderID, command.message);
		break;
	case 'button':
		sendButtonMessage(senderID, command.message);
		break;
	case 'quickreply':
		sendQuickReply(senderID, command.message);
		break;
	case 'typingon':
		sendTypingOn(senderID);
		break;
	case 'typingoff':
		sendTypingOff(senderID);
		break;
	case 'emote':
		sendEmoteMessage(senderID, command);
		break;
	default:
		throw new Error('Unknown message type: ' + command);
	}
}

var sendEmoteMessage = function (recipientId, emote) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "image",
				payload: {
					url: twitch.template.large.replace('{image_id}', emote.image_id)
				}
			}
		}
	};
	callSendAPI(messageData);
}

var sendImageMessage = function (recipientId, image) {
  var messageData = {
	recipient: {
	  id: recipientId
	},
	message: {
	  attachment: {
		type: "image",
		payload: {
		  url: config.messenger.serverURL + '/images/' + image
		}
	  }
	}
  };
	callSendAPI(messageData);
}

var sendAudioMessage = function (recipientId, audio) {
  var messageData = {
	recipient: {
	  id: recipientId
	},
	message: {
	  attachment: {
		type: "audio",
		payload: {
		  url: config.messenger.serverURL + "/files/" + audio
		}
	  }
	}
  };
	callSendAPI(messageData);
}

var sendVideoMessage = function (recipientId, video) {
  var messageData = {
	recipient: {
	  id: recipientId
	},
	message: {
	  attachment: {
		type: "video",
		payload: {
		  url: config.messenger.serverURL + "/files/" + video
		}
	  }
	}
  };
	callSendAPI(messageData);
}

var sendFileMessage = function (recipientId, file) {
  var messageData = {
	recipient: {
	  id: recipientId
	},
	message: {
	  attachment: {
		type: "file",
		payload: {
		  url: config.messenger.serverURL + "/files/" + file
		}
	  }
	}
  };
	callSendAPI(messageData);
}

var sendTextMessage = function (recipientId, messageText) {
  var messageData = {
	recipient: {
	  id: recipientId
	},
	message: {
	  text: messageText,
	  metadata: "DEVELOPER_DEFINED_METADATA"
	}
  };
	callSendAPI(messageData);
}

var sendButtonMessage = function (recipientId, messageData) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: messageData
	};  
	callSendAPI(messageData);
}

var sendGenericMessage = function (recipientId, messageData) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: messageData
	};  
	callSendAPI(messageData);
}

var sendQuickReply = function (recipientId, messageData) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: messageData
	};
	callSendAPI(messageData);
}

var sendTypingOn = function (recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		sender_action: "typing_on"
	};
	callSendAPI(messageData);
}

var sendTypingOff = function (recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		sender_action: "typing_off"
	};
	callSendAPI(messageData);
}

var callSendAPI = function (messageData) {
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {
			access_token: config.messenger.pageAccessToken
		},
		method: 'POST',
		json: messageData
	}, function (error, response, body) {
		if (!error && response.statusCode == 200)
		{
			var recipientId = body.recipient_id;
			var messageId = body.message_id;
			// if (messageId)
				// console.log("Successfully sent message with id %s to recipient %s", messageId, recipientId);
			// else
				// console.log("Successfully called Send API for recipient %s", recipientId);
		}
		else
			console.error(response.body.error);
	});  
}

module.exports = {
	receivedAuthentication: receivedAuthentication,
	receivedMessage: receivedMessage,
	receivedDeliveryConfirmation: receivedDeliveryConfirmation,
	receivedPostback: receivedPostback,
	receivedMessageRead: receivedMessageRead,
	executeCommand: executeCommand
}