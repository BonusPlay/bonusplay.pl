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
	riot: {
		key: ''
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
	ssl: {
		privateKey: '/etc/letsencrypt/live/bonusplay.pl/privkey.pem',
		certificate: '/etc/letsencrypt/live/bonusplay.pl/cert.pem',
		chain: '/etc/letsencrypt/live/bonusplay.pl/chain.pem',
		port: 3001
	},
	port: 3000
}