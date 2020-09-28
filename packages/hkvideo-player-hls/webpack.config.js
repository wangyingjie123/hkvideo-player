/* eslint-disable */
const polyfill = [];
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const umd = {
    entry: polyfill.concat(['./src/index.js']),
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
        library: 'HlsJsPlayer',
        libraryTarget: 'umd'
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        minimize: true
                    }
                },
                'postcss-loader',
                'sass-loader'
            ]
        }]
    },
    // externals: {
    //     '@baidu/hkplayer': '@baidu/hkplayer'
    // },
    plugins: [
        new HardSourceWebpackPlugin()
    ],
    optimization: {
        minimize: true
    }
}

const client = {
    entry: polyfill.concat(['./src/index.js']),
    output: {
        path: `${__dirname}/browser`,
        filename: 'index.js',
        library: 'HlsJsPlayer',
        libraryTarget: 'window'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        minimize: true
                    }
                },
                'postcss-loader',
                'sass-loader'
            ]
        }]
    },
    // externals: {
    //     '@baidu/hkplayer': '@baidu/hkplayer'
    // },
    plugins: [
        new HardSourceWebpackPlugin()
    ],
    mode: 'production',
    optimization: {
        minimize: true
    }
};

module.exports = [umd, client];
