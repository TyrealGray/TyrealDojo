const webpack = require('webpack');

module.exports = {
	entry: './src/main.js',
	devtool: 'eval-source-map',
	output: {
		path: __dirname,
		filename: 'dataMap.js',
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
			},
		}),
	],
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
			}
		],
	}
};