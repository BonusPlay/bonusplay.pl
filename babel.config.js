const presets = ["@vue/app"];

const plugins = [
	[
		"prismjs",
		{
			languages: [
				"bash",
				"javascript",
				"markup"
			],
			plugins: [
				"line-highlight",
				"line-numbers",
				"autolinker",
				"copy-to-clipboard"
			],
			theme: "tomorrow",
			css: true
		}
	]
];


module.exports = { presets, plugins };