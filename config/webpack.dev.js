const path = require('path')
const webpack = require('webpack')
module.exports = {
	mode: 'development',
	devtool: 'source-map',
	// watch: true,
	// watchOptions: {
	//   ignored: /node_modules/,
	// },
	devServer: {
		port: 9000,
		open: true,
		contentBase: 'dist',
		compress: true,
		writeToDisk: true, // 写入磁盘
		hot: true
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
}
