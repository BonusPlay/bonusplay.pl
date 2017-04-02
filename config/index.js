module.exports = {
	messenger: {
		appSecret: '<secret>',
		pageAccessToken: '<secret>',
		validationToken: '<secret>',
		serverAPIURL: 'api.bonusplay.pl',
		serverURL: 'https://bonusplay.pl',
		updateInterval: 86400000
	},
	discord: {
		token: '<secret>',
		ownerId: '<secret>',
		cmdPrefix: '!'
	},
	trello: {
		key: '<secret>',
		token: '<secret>',
		secret: '<secret>',
		channelId: '<secret>'
	},
	github: {
		token: '<secret>'
	},
	database: {
		user: '<secret>',
		password: '<secret>',
		database: '<secret>',
		config: {
			host: 'localhost',
			logging: false,
			dialect: 'mysql'
		}
	},
	port: 3000,
	portSSL: 3001
}