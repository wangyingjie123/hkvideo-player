/* eslint-disable */
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const globGonfig = {
    entry: './src/index.js',
    devtool: isProd ? false : 'cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
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
        }]
    },
    externals: {
        'hkvideo-player': 'hkvideo-player'
    },
    plugins: [
        new HardSourceWebpackPlugin()
    ],
    optimization: {
        minimize: isProd
    }
}
const umd = {
    ...globGonfig,
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
        library: 'haokan-mp4',
        libraryTarget: 'umd',
    }
}
const client = {
    ...globGonfig,
    output: {
        path: `${__dirname}/browser`,
        filename: 'index.js',
        library: 'hkvideoMp4Player',
        libraryTarget: 'window'
    }
}
module.exports = [umd, client]
