/* eslint-disable */
const polyfill = [];
const umd = {
    entry: polyfill.concat(['./src/index.js']),
    devtool: 'source-map',
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
        library: 'hkplayer-mp4',
        libraryTarget: 'umd'
    },
    mode: 'production',
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
    optimization: {
        minimize: true
    }
}

const client = {
    entry: polyfill.concat(['./src/index.js']),
    devtool: 'source-map',
    output: {
        path: `${__dirname}/browser`,
        filename: 'index.js'
    },
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
    mode: 'production',
    optimization: {
        minimize: true
    }
}

module.exports = [umd, client]
