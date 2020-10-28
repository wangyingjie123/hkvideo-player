/**
 * @file webpack
 * @author wangyingjie07
 */
/* eslint-disable */
const polyfill = [];
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const threadLoader = require('thread-loader');
const fs = require('fs');
const path = require('path');
const browsers = [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
    'Opera 12.1',
    'not ie <= 9',
    'Android >= 4.0',
    'iOS >=9'
];

const isProd = process.env.NODE_ENV === 'production'
const globConfig = {
    entry: polyfill.concat(['./src/index.js']),
    devtool: isProd ? false : 'cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
    module: {
		rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/',
            },
            {
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
            },
            {
                test: /\.svg/,
                loader: 'raw-loader'
            }
        ]
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
module.exports = umd;
// module.exports = [umd, client];
