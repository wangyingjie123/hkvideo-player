/**
 * @file webpack
 * @author wangyingjie07
 */
/* eslint-disable */
const polyfill = [];
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const fs = require('fs');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const globConfig = {
    entry: polyfill.concat(['./src/index.js']),
    devtool: isProd ? false : 'cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
    module: {
		rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
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
    externals: {
        'hkvideo-player': 'hkvideo-player'
    },
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
		library: 'FlvJsPlayer',
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
		library: 'FlvJsPlayer',
		libraryTarget: 'window'
    }
};
// 开发的时候可以去掉umd，打包更快
// module.exports = client;
module.exports = [umd, client];