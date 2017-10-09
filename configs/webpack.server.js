var webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");
var path = require("path");
var fs = require("fs");

module.exports = {
    target: "node",
    cache: false,
    context: __dirname,
    debug: false,
    devtool: "source-map",
    entry: ["../src/server"],
    output: {
        path: path.join(__dirname, "../build"),
        filename: "server.js"
    },
    plugins: [
        new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false}),
        new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}})
    ],
    module: {
        loaders: [
            {test: /\.json$/, loaders: ["json"]},
            {
                test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
                loaders: ["file?context=static&name=/[path][name].[ext]"],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"],
                exclude: /node_modules/
            }
        ],
        postLoaders: [],
        noParse: /\.min\.js/
    },
    externals: [nodeExternals({
        whitelist: ["webpack/hot/poll?1000"]
    })],
    resolve: {
        modulesDirectories: [
            "src",
            "node_modules",
            "static"
        ],
        extensions: ["", ".json", ".js"]
    },
    node: {
        __dirname: true,
        fs: "empty"
    }
};


var webpack = require('webpack');
var path = require('path');
var process = require('process');
process.traceDeprecation = true;

//var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&noInfo=true';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    name: "develop",
    entry: {
        server: "../src/server"
    },
    //devtool: "hidden-source-map",
    output: {
        path: path.resolve(__dirname, 'build'),
        //publicPath: "/loan",
        filename: "[name].js"
    },
    devtool:"source-map",
    plugins: [
        new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false}),
        new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}})
    ],
    module: {
        rules: [
            {test: /\.jpg$/, use: ["file-loader?name=images/[name].[ext]"]},
            {test: /\.png$/, use: ["url-loader?name=images/[name].[ext]&limit=8192"]},
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }],
            },
            {
                test: /\.svg$/,
                loader: 'url-loader?name=images/[name].[ext]&limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader',{
                        loader:'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')({
                                        browsers: [
                                            "Android >= 4",
                                            "iOS >= 7"
                                        ]
                                    })
                                ];
                            }
                        }
                    }]
                })
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.js|jsx$/,
                use: [{
                    loader: 'babel-loader'
                }]

            }

        ]
    }
}