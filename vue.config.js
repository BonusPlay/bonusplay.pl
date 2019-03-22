const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([{
				from: path.join(__dirname, "src/static"),
				to: path.join(__dirname, "dist"),
				toType: "dir",
				ignore: ["index.html", ".DS_Store"]
			}])
		],
		devtool: 'source-map'
	},

    chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].template = 'src/index.html';
				return args;
			});
		config.module
			.rule('ifdef')
			.test(/\.js?$/)
			.use('ifdef-loader')
			.tap(args => {
				return {
					"DEBUG": process.env.NODE_ENV === 'development',
					"MOCK_API": process.env.MOCK_API === 'true',
					"ifdef-verbose": true,
					"ifdef-triple-slash": true
				}
			})
			.loader('ifdef-loader')
			.end();
	},

    pwa: {
      name: 'bonusplay.pl',
      themeColor: '#6b1b80',
      msTileColor: '#6b1b80'
    }
}