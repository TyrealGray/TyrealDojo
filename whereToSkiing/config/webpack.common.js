const path = require('path');

module.exports = {
    entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, '../'),
		filename: 'whereToSkiing.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env'],
						plugins: [
							require('babel-plugin-transform-object-rest-spread'),
							require('babel-plugin-transform-class-properties'),
						],
					},
				},
			},
		],
	},
};