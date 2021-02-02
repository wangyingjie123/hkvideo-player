/* eslint-disable */
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const globConfig = {
    entry: './src/index.js',
    mode: isProd ? 'production' : 'development',
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
    externals: {
        'hkplayer-player': 'hkplayer-player'
    },
    plugins: [
        new HardSourceWebpackPlugin()
    ],
    optimization: {
        minimize: isProd
    }
}
const umd = {
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
        library: 'HlsJsPlayer',
        libraryTarget: 'umd'
    },
    ...globConfig
}

const client = {
    ...globConfig,
    output: {
        path: `${__dirname}/browser`,
        filename: 'index.js',
        library: 'HlsJsPlayer',
        libraryTarget: 'window',
        libraryExport: 'default'
    }
};

module.exports = [umd, client];
