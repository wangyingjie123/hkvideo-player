/**
 * @file webpack
 * @author wangyingjie07
 */
/* eslint-disable */
var fs = require('fs');
const polyfill = [];
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const threadLoader = require('thread-loader');
const jsWorkerPool = {
	// options
	// 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
	// 当 require('os').cpus() 是 undefined 时，则为 1
	workers: 2,
	// 闲置时定时删除 worker 进程
	// 默认为 500ms
	// 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
	poolTimeout: 2000
};
const cssWorkerPool = {
	// 一个 worker 进程中并行执行工作的数量
	// 默认为 20
	workerParallelJobs: 2,
	poolTimeout: 2000
};

threadLoader.warmup(jsWorkerPool, ['babel-loader']);
// threadLoader.warmup(cssWorkerPool, ['css-loader', 'postcss-loader', 'sass-loader']);



const devServer = {
	open: true,  //自动打开页面
	host: '0.0.0.0',
	hotOnly: true,
	disableHostCheck: true,
	port: 12306,
	index: '/',
	contentBase: '/',
	before(app) {
		app.get('/', (req, res, next) => {
			var contentText = fs.readFileSync('./index.html', 'utf-8');
			res.write(contentText);
			res.end();
		});
	},
};

const umd = {
	entry: polyfill.concat(['./src/index.js']),
	devtool: 'source-map',
	output: {
		path: `${__dirname}/dist`,
		filename: 'index.js',
		library: 'hkplayer',
		libraryTarget: 'umd'
	},
	// mode: 'production',
	module: {
		rules: [{
			test: /\.js$/,
			use: [
				{
					loader: 'thread-loader',
					options: jsWorkerPool
				},
				'babel-loader'
			]
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				// {
				// 	loader: 'thread-loader',
				// 	options: cssWorkerPool
				// },
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						// minimize: true
					}
				},
				'postcss-loader',
				'sass-loader'
			]
		}, {
			test: /\.svg/,
			loader: 'raw-loader'
		}]
	},
	devServer,
	optimization: {
		minimize: true
	}
};

const client = {
	entry: polyfill.concat(['./src/index.js']),
	devtool: 'source-map',
	output: {
		path: `${__dirname}/browser`,
		filename: 'index.js',
		library: 'Player',
		libraryTarget: 'window'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: [
				{
					loader: 'thread-loader',
					options: jsWorkerPool
				},
				'babel-loader'
			]
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						// minimize: true
					}
				},
				'postcss-loader',
				'sass-loader'
			]
		}, {
			test: /\.svg/,
			loader: 'raw-loader'
		}]
	},
	mode: 'production',
	optimization: {
		minimize: true
	},
	devServer,
};
module.exports = [umd, client];
