const path = require('path')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const { merge } = require('webpack-merge')
const readEnv = require('./readEnv')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const miniCssChunks = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const env = readEnv('.env')

let assignConfig = {}
let assignDev = {}
let c_path = ''
if (process.env.NODE_ENV === 'development') {
	assignConfig = dev
	assignDev = readEnv('.env.development')
	c_path = './'
} else if (process.env.NODE_ENV === 'production') {
	assignConfig = prod
	assignDev = readEnv('.env.production')
	c_path = './'
}

function join(cur) {
	return path.join(__dirname, '../', cur)
}

const webpackConfig = merge(
	{
		mode: 'none',
		entry: {
			main: join('src/main.js')
		},
		output: {
			filename: 'js/[name].[chunkhash].js',
			chunkFilename: 'js/chunks.[chunkhash].js',
			path: join('dist'),
			publicPath: c_path
		},
		resolve: {
			alias: {
				// 别名
			},
			extensions: ['.ts', '.js', '.css']
			// modules: ['node_modules'] //查找模块位置
		},
		// externals: {
		// 	F2: 'F2'
		// },
		// optimization: {
		// 	// 本身production 就提供默认优化
		// 	splitChunks: {
		// 		chunks: 'all',
		// 		maxSize: 200
		// 	}
		// },
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					extractComments: false
				})
			],
			splitChunks: {
				minSize: 30,
				cacheGroups: {
					default: {
						name: 'common',
						chunks: 'initial',
						minChunks: 2,
						priority: -20
					},
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						chunks: 'initial',
						priority: -10
					}
				}
			}
		},
		module: {
			// noParse: '',
			rules: [
				{
					test: /\.(png|jpe?g|gif|svg)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: false,
								esModule: false,
								name: 'imgs/[hash:8].[ext]'
							}
						}
					]
				},
				// {
				// 	test: /\.(eot|ttf|woff|woff2)$/i,
				// 	generator: {
				// 		filename: 'font/[hash][ext][query]'
				// 	},
				// 	type: 'asset'
				// },
				// {
				// 	test: /\.(png|jpe?g|gif)$/i,
				// 	generator: {
				// 		filename: 'imgs/[hash][ext][query]'
				// 	},
				// 	type: 'asset'
				// },
				{
					test: /\.(htm|html)$/i,
					use: ['html-withimg-loader']
				},
				{
					test: /\.css$/i,
					use: [
						// {
						// 	loader: 'style-loader',
						// 	options: {
						// 		// injectType: 'linkTag' ,
						// 		insert: 'head'
						// 	}
						// },
						// 'file-loader',
						{
							loader: miniCssChunks.loader,
							options: {
								publicPath() {
									return '../'
								}
							}
						},
						// {
						// 	loader: 'url-loader',
						// 	options: {
						// 		esModule: false
						// 	}
						// },
						{
							loader: 'css-loader'
							// options: { importLoaders: 1 }
						},
						{
							loader: 'postcss-loader'
						}
					]
				},
				{
					enforce: 'pre', // 优先执行 前置
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'eslint-loader',
							options: {
								fix: true,
								emitWarning: false,
								emitError: false
							}
						}
					]
				},
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'babel-loader'
						}
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: process.env.title || '项目',
				filename: 'index.html',
				template: 'public/index.html',
				inject: 'body',
				scriptLoading: 'blocking'
			}),
			new miniCssChunks({
				filename: 'css/[name].[contenthash].css',
				insert: 'head'
			}),
			new webpack.DefinePlugin({
				'process.env': JSON.stringify(merge(process.env, env, assignDev))
			}),
			new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [join('dist')] })
		]
	},
	assignConfig
)

module.exports = webpackConfig
