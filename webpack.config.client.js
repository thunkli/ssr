const {join} = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const prod = process.env.NODE_ENV === "production";
console.log(`Compiling client code with production set to "${prod}"`);

module.exports = {
    entry: !prod ? (
        {
            bundle: ['webpack-hot-middleware/client', 'isomorphic-fetch', 'regenerator-runtime/runtime', join(__dirname, './src/utils/polyfills.js'), join(__dirname, './src/crossover/entry.js')],
        }
    ) : (
        {
            bundle: [join(__dirname, './src/utils/polyfills.js'), 'isomorphic-fetch', 'regenerator-runtime/runtime', './src/crossover/entry.js'],
            // vendor: ['react', 'react-dom'],
        }
    ),
    target: 'web',
    output: {
        path: join(__dirname, 'build'),
        filename: '[name].js',
        pathinfo: !prod,
        publicPath: '/build/',
    },
    devtool: prod ? 'source-map' : 'eval',
    module: {
        loaders: [
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader',
                ],
            },

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
                test: /\.s?css/,
                loader: prod ? (
                    ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
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
                            },
                            'sass-loader',
                        ],
                    })
                ) : (
                    'style-loader!css-loader!postcss-loader!sass-loader'
                ),
            },
        ],
    },
    plugins: !prod ? ([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                BABEL_ENV: JSON.stringify('client-dev'),
            },
        })
    ]) : ([
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: true,
            screw_ie8: true,
            compress: {
                warnings: false,
                drop_console: true,
            },
            output: {
                comments: false,
            },
            sourceMap: false,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BABEL_ENV: JSON.stringify('client-build'),
                APP_ENV: JSON.stringify('browser'),
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new ExtractTextPlugin("styles.css"),
    ]),
};

//postcss: [autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Opera >= 12', 'Chrome >= 25', 'Firefox >= 13', 'ie >= 9'] })],
