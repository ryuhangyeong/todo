const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/js/index.js",
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "../../backend/dist")
	},
	module: {
		rules: [
			{	
				test: /\.js$/,
			    exclude: /node_modules/,
			    loader: "babel-loader"
			},
			{
				test: /\.s?css$/,
				use: [process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "sass-loader"]
			},
			{
		        test: /\.(woff|woff2|eot|ttf|otf)$/,
		        use: [
		        	{
		        		loader: "file-loader",
		        		options: {
		        			name: "[name].[contenthash].[ext]",
		        			outputPath: "font/"
		        		}
		        	}
		        ]
	        },
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/html/index.html",
			favicon: "./src/favicon.ico",
			hash: true
		}),
		...(process.env.NODE_ENV === "production" ? [new MiniCssExtractPlugin({ filename: "index.css" })] : [])
	]
};