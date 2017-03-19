const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')
let clientConfig, serverConfig

function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`
            // console.log(`commonjs ${filename}`);
            return externals
        }, {})
}

clientConfig = {
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: './client',
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'superagent'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'chunk.[name].[chunkhash:8].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-runtime', 'add-module-exports'],
                    cacheDirectory: true
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?minimize',
                        'postcss-loader',
                    ]
                })
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?minimize&modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]',
                        'postcss-loader',//对应配置文件项目根目录下postcss.config.js
                        'sass-loader'
                    ]
                })
            }, {
                test: /\.(png|jpg|gif|webp|woff|woff2|eot|svg|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }

            }, {
                test: /\.(mp3|mp4|ogg|svg)$/,
                loader: 'file-loader'

            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: false
                }

            }
        ],
    },

    resolve: { extensions: ['.js', '.json', '.scss'] },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].[chunkhash:8].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
        new HtmlWebpackPlugin({
            filename: '../../views/prod/index.html',
            template: './views/tpl/index.tpl.html',
            //  chunksSortMode: 'none'
        }),
        new ExtractTextPlugin({ filename: '[name].[contenthash:8].css', allChunks: true })
    ]
}

serverConfig = {
    context: path.resolve(__dirname, '..'),
    entry: { server: './server/server.prod' },
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['add-module-exports'],
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                ]
            }, {
                test: /\.scss$/,
                use: [
                    'css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|webp|woff|woff2|eot|svg|ttf)$/,
                loader: 'url-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    externals: getExternals(),
    resolve: { extensions: ['.js', '.json', '.scss'] },


    plugins: [

        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
    ]
}

module.exports = [clientConfig, serverConfig]
