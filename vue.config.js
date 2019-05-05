const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");

// auto import common.less to all components
const types = ["vue-modules", "vue", "normal-modules", "normal"];
function addStyleResource(rule) {
	rule.use("style-resource")
		.loader("style-resources-loader")
		.options({
			patterns: [path.resolve(__dirname, "./src/common.less")]
		});
}

module.exports = {
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([
				{
					from: path.join(__dirname, "src/static"),
					to: path.join(__dirname, "dist"),
					toType: "dir",
					ignore: ["index.html", ".DS_Store"]
				}
			]),
			new CompressionPlugin(),
			new webpack.optimize.AggressiveMergingPlugin()
		],
		devtool: "source-map"
	},

	chainWebpack: config => {
		// move HTML file
		config.plugin("html").tap(args => {
			args[0].template = "src/index.html";
			return args;
		});

		// add ifdef loader
		config.module
			.rule("ifdef")
			.test(/\.js?$/)
			.use("ifdef-loader")
			.tap(() => {
				return {
					DEBUG: process.env.NODE_ENV === "development",
					MOCK_API: process.env.MOCK_API === "true",
					"ifdef-verbose": true,
					"ifdef-triple-slash": true
				};
			})
			.loader("ifdef-loader")
			.end();

		// auto import common.less
		types.forEach(type =>
			addStyleResource(config.module.rule("less").oneOf(type))
		);
	},
	pwa: {
		name: "bonusplay.pl",
		themeColor: "#6b1b80",
		msTileColor: "#6b1b80"
	}
};
