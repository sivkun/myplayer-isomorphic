const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin')
process.noDeprecation = true
module.exports = {

    devtool: 'eval-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: [
            './client',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
        ],
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
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
                plugins: ['transform-runtime', 'add-module-exports'],
                cacheDirectory: true
            }
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        camelCase: true,
                        importLoaders: 1,
                        localIdentName: '[name]__[local]__[hash:base64:8]'
                    }
                },
                'sass-loader'
            ]
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

        }],
    },
    resolve: { extensions: ['.js', '.json', '.css', '.scss'] },
    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].js'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
        new HtmlWebpackPlugin({
            filename: '../views/dev/index.html',
            template: './views/tpl/index.tpl.html'
        }),
        new ProgressBarPlugin({ summary: false })
    ]
}