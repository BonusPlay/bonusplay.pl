'use strict';

var config 	= require('../config');
var cmds 	= require('../config/discordCommands');
var color 	= require('colour');
var Discord = require('discord.js');

var discord = new Discord.Client();

discord.on('ready', function() {
	console.log(color.green('[DISCORD]') + ' Client Ready');
});

discord.on('debug', function(msg) {
	console.log(color.cyan('[DISCORD] ') + msg);
});

discord.on('warn', function(msg) {
	console.log(color.yellow('[DISCORD] ') + msg);
});

discord.on('disconnected', function() {
	console.log(color.red('[DISCORD]') + ' Disconnected');
});

discord.on('message', function(msg) {
	if(msg.author.id != discord.user.id && (msg.content[0] === config.discord.cmdPrefix || msg.content.indexOf(discord.user.mention()) == 0))
	{
		var cmdTxt = msg.content.split(" ")[0].substring(1);
		var suffix = msg.content.substring(cmdTxt.length + 2);
		if(msg.content.indexOf(discord.user.mention()) == 0)
		{
			try
			{
				cmdTxt = msg.content.split(" ")[1];
				suffix = msg.content.substring(discord.user.mention().length+cmdTxt.length + 2);
			}
			catch(e) // NO COMMAND
			{
				discord.sendMessage(msg.channel, 'Yes?');
				return;
			}
		}
		if(cmdTxt === 'help')
		{
			discord.sendMessage(msg.author, 'Avaliable commands:', function() {
				var value = '';
				for(var cmd in cmds)
				{
					value += '`' + config.discord.cmdPrefix + cmd + '`\n';
					value += '\tUSAGE: **' + cmds[cmd].usage + '**\n';
					value += '\tDESCRIPTION: **' + cmds[cmd].description + '**\n';
				}
				discord.sendMessage(msg.author, value);
			});
		}
		else if(cmds[cmdTxt])
		{
			cmds[cmdTxt].process(discord, msg, suffix);
		}
		else
		{
			discord.sendMessage(msg.channel, 'Unknown command `' + cmdTxt + '`. Type in `' + config.discord.cmdPrefix + 'help` for list of commands');
		}
	}
});

discord.loginWithToken(config.discord.token, function(err, token) {
	if (err)
		throw err;
	console.log(color.green('[DISCORD]') + ' Logged into discord');
});

module.exports = discord;