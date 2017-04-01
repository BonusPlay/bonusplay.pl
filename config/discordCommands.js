var config 	= require('./index');
var fs 		= require('fs');
var counter = 0;

module.exports = {
	'ping': {
		description: 'pong!',
		usage: config.discord.cmdPrefix + 'ping',
		process: function(discord, msg, suffix) {
			discord.sendMessage(msg.channel, msg.sender + ' pong!');
			if(suffix)
				discord.sendMessage(msg.channel, ' note that **' + config.discord.cmdPrefix + 'ping** takes no arguments!');
		}
	},
	'version': {
		description: 'returns current DiscordBonusBot version.',
		usage: config.discord.cmdPrefix + 'version',
		process: function(discord, msg, suffix) {
			discord.sendMessage(msg.channel, msg.sender + ' is running on version ' + process.env.npm_package_version);
			if(suffix)
				discord.sendMessage(msg.channel, ' note that **' + config.discord.cmdPrefix + 'version** takes no arguments!');
		}
	},
	'blameohei': {
		description: 'when everything goes wrong - blame ohei',
		usage: config.discord.cmdPrefix + 'blameohei',
		process: function(discord, msg, suffix) {
			counter++;
			discord.sendMessage(msg.channel, msg.sender + ' blamed oHei! Total blames: ' + counter);
			if(suffix)
				discord.sendMessage(msg.channel, ' note that **' + config.discord.cmdPrefix + 'blameohei** takes no arguments!');
		}
	}
}