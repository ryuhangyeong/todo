const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		publicPath: '/',
		proxy: {
			'/api': 'http://localhost:4000'
		}
	},
	plugins: [
		new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1',
            analyzerPort: 8081
        })
	]
});