const path = require('path');

module.exports = {
	entry: './src/index.js',
	devtool: 'eval-source-map',
	output: {
		path: __dirname,
		filename: 'bleed.js',
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
};