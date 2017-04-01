var config 	= require('../config');
var color 	= require('colour');
var discord = require('./discordHelper');

module.exports = function(req) {
	var message = '';
	
	if(links[req.action.idMemberCreator] == null)
		message += req.action.memberCreator.fullName;
	else
		message += discord.users.get('id', links[req.action.idMemberCreator]);
	
	switch(req.action.type)
	{
	case 'createCard':
		message += ' created card **' + req.action.data.card.name + '** in **' + req.action.data.list.name + '**';
		break;
	case 'createList':
		message += ' created list **' + req.action.data.list.name + '**';
		break;
	case 'addLabelToCard':
		if(req.model.labelNames[req.action.data.value] === '')
			message += ' added label **' + req.action.data.value + '** to **' + req.action.data.card.name + '**';
		else
			message += ' added label **' + req.model.labelNames[req.action.data.value] + '** to **' + req.action.data.card.name + '**';
		break;
	case 'removeLabelFromCard':
		if(req.model.labelNames[req.action.data.value] === '')
			message += ' removed label **' + req.action.data.value + '** from **' + req.action.data.card.name + '**';
		else
			message += ' removed label **' + req.model.labelNames[req.action.data.value] + '** from **' + req.action.data.card.name + '**';
		break;
	case 'addMemberToCard':
		if(links[req.action.member.id] == null)
			message += ' added **' + req.action.member.fullName + '** to **' + req.action.data.card.name + '**';
		else
			message += ' added **' + discord.users.get('id', links[req.action.member.id]) + '** to **' + req.action.data.card.name + '**';
		break;
	case 'removeMemberFromCard':
		if(links[req.action.member.id] == null)
			message += ' removed **' + req.action.member.fullName + '** from **' + req.action.data.card.name + '**';
		else
			message += ' removed **' + discord.users.get('id', links[req.action.member.id]) + '** from **' + req.action.data.card.name + '**';
		break;
	case 'updateList':
		if(req.action.data.old.closed != null)
		{
			if(req.action.data.old.closed)
				message += ' unarchived list **' + req.action.data.list.name + '**';
			else
				message += ' archived list **' + req.action.data.list.name + '**';
			break;
		}
		else if(req.action.data.old.pos == null)
			discord.sendMessage(discord.users.get('id', config.discord.ownerId), '```' + JSON.stringify(req) + '```');
		else
			return;
	case 'updateCard':
		if(req.action.data.card.closed != null)
		{
			if(req.action.data.old.closed)
				message += ' unarchived card **' + req.action.data.card.name + '**';
			else
				message += ' archived card **' + req.action.data.card.name + '**';
			break;
		}
		else if(req.action.data.card.pos == null)
			discord.sendMessage(discord.users.get('id', config.discord.ownerId), '```' + JSON.stringify(req) + '```');
		else
			return;
	case 'createLabel':
		return;
	case 'deleteLabel':
		return;
	case 'updateLabel':
		return;
	default:
		console.log(color.red('[DISCORD]') + ' unknown action type ' + req.action.type);
		discord.sendMessage(discord.users.get('id', config.discord.ownerId), '[DISCORD] unknown action type\n```' + JSON.stringify(req) + '```');
		return;
	}
	
	discord.sendMessage(discord.channels.get('id', config.trello.channelId), message);
}

var links = {
	'<secret>': '<secret>'
}