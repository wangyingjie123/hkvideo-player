/**
 * @file webpack
 * @author wyj007
 */
/* eslint-disable */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const fs = require('fs');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const globConfig = {
    entry: ['./src/index.js'],
    devtool: isProd ? false : 'cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
    target: ['web', 'es5'],
    module: {
		rules: [{
			test: /\.js$/,
			use: [
                'babel-loader'
            ],
            exclude: '/node_modules/',
		}]
    },
    plugins: [
        // new BundleAnalyzerPlugin({
        //     defaultSizes: 'parsed'
        // })
    ],
    optimization: {
        minimize: isProd,
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
		library: 'thumbnail',
        libraryTarget: 'umd'
    },
    ...isProd && {cache: {
        ...cacheConfig,
        name: 'umd-cache'
    }},
    ...globConfig
};

const client = {
    ...globConfig,
    // 配置缓存--生产环境开启
    ...isProd && {cache: {
        ...cacheConfig,
        name: 'client-cache'
    }},
	output: {
		path: `${__dirname}/browser`,
		filename: 'index.js',
		library: 'thumbnail',
        libraryTarget: 'window',
        libraryExport: 'default'
    }
};
// 开发的时候可以去掉umd，打包更快
// module.exports = client;
module.exports = [umd, client];