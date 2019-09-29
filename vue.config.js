module.exports = {
	chainWebpack: config => {
		config.module
			.rule('txt')
			.test(/\.txt$/i)
			.use('raw-loader')
				.loader('raw-loader')
				.end()
	}
}