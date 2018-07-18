const webpack = require('webpack'),
	merge = require('webpack-merge'),
	common = require('./webpack.common.js');
	

const nodeConfig = {
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
	],
};

module.exports = merge(common, nodeConfig);