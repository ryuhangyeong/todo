const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const FlowBabelWebpackPlugin = require("flow-babel-webpack-plugin");

module.exports = merge(common, {
	mode: "development",
	devServer: {
		hot: true,
		contentBase: path.join(__dirname, "../dist"),
		publicPath: "/",
		proxy: {
			"/api": "http://localhost:80"
		}
	},
	devtool: "cheap-eval-source-map",
	module: {
		rules: [
			{
		        enforce: "pre",
		        test: /\.js$/,
		        loader: "eslint-loader",
		        exclude: /node_modules/,
		        options: {
		        	fix: true
		        }
		    }
		]
	},
	plugins: [
		new BundleAnalyzerPlugin({
            analyzerHost: "127.0.0.1",
            analyzerPort: 8081
        }),
        new FlowBabelWebpackPlugin({
        	warn: true
        })
	]
});