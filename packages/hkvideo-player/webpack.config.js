/**
 * @file webpack
 * @author wangyingjie07
 */
/* eslint-disable */
const polyfill = [];
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');\
const threadLoader = require('thread-loader');
const fs = require('fs');
const path = require('path');
// js-thread-loader
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
threadLoader.warmup(jsWorkerPool, ['babel-loader']);

const isProd = process.env.NODE_ENV === 'production'
const globConfig = {
    entry: polyfill.concat(['./src/index.js']),
    devtool: isProd ? false : 'cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
    module: {
		rules: [{
			test: /\.js$/,
			use: [
			//   {
			// 	loader: 'thread-loader',
			// 	options: jsWorkerPool
			//   },
			  'babel-loader'
			]
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1
					}
				},
				'postcss-loader',
				'sass-loader'
			]
		},{
            test: /\.svg/,
            loader: 'raw-loader'
        }]
    },
    plugins: [
        // new BundleAnalyzerPlugin({
        //     defaultSizes: 'parsed'
        // })
    ],
    optimization: {
		minimize: isProd
    }
}
const cacheConfig = {
    // 磁盘存储
    type: 'filesystem',    // 'memory' | 'filesystem'
    buildDependencies: {
        // 当配置修改时，缓存失效
        config: [__filename]
    },
}
const umd = {
	output: {
		path: `${__dirname}/dist`,
		filename: 'index.js',
		library: 'hkplayer',
		libraryTarget: 'umd'
    },
    cache: {
        ...cacheConfig,
        name: 'umd-cache'
    },
    ...globConfig
};

const client = {
    ...globConfig,
    // 配置缓存
    cache: {
        ...cacheConfig,
        name: 'client-cache'
    },
	output: {
		path: `${__dirname}/browser`,
		filename: 'index.js',
		library: 'Player',
		libraryTarget: 'window'
    }
};
// 开发的时候可以去掉umd，打包更快
// module.exports = client;
module.exports = [umd, client];
