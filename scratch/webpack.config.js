const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const defaults = require('lodash.defaults');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const gitsha = require('git-bundle-sha');
const path = require('path');
const webpack = require('webpack');

let routes = require('./src/routes.json');
const templateConfig = require('./src/template-config.js'); // eslint-disable-line global-require

if (process.env.NODE_ENV !== 'production') {
    routes = routes.concat(require('./src/routes-dev.json')); // eslint-disable-line global-require
}

routes = routes.filter(route => !process.env.VIEW || process.env.VIEW === route.view);

let VersionPlugin = function (options) {
    this.options = options || {};
    return this;
};

VersionPlugin.prototype.apply = function (compiler) {
    const addVersion = function (compilation, versionId, callback) {
        compilation.assets['version.txt'] = {
            source: function () {
                return versionId;
            },
            size: function () {
                return versionId.length;
            }
        };
        callback();
    };
    const options = this.options;
    
    compiler.plugin('emit', function (compilation, callback) {
        const sha = process.env.WWW_VERSION;
        if (!sha) { // eslint-disable-line no-negated-condition
            gitsha(options, function (err, _sha) {
                if (err) return callback(err);
                return addVersion(compilation, _sha, callback);
            });
        } else {
            return addVersion(compilation, sha, callback);
        }
    });
};

// Prepare all entry points
let entry = {
    common: [
        // Vendor
        'raven-js',
        'react',
        'react-dom',
        'react-intl',
        'redux',
        // Init
        './src/init.js'
    ]
};
routes.forEach(function (route) {
    if (!route.redirect) {
        entry[route.name] = `./src/views/${route.view}.jsx`;
    }
});

// Config
module.exports = {
    entry: entry,
    devtool: process.env.NODE_ENV === 'production' ? 'none' : 'eval',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                options: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer({browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']})];
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer({browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']})];
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
                loader: 'url-loader'
            }
        ],
        noParse: /node_modules\/google-libphonenumber\/dist/
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new VersionPlugin({length: 5})
    ].concat(routes
        .filter(function (route) {
            return !route.redirect;
        })
        .map(function (route) {
            return new HtmlWebpackPlugin(defaults({}, {
                title: route.title,
                filename: route.name + '.html',
                route: route
            }, templateConfig));
        })
    ).concat([
        new CopyWebpackPlugin([
            {from: 'static'},
            {from: 'intl', to: 'js'}
        ]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-gui/dist/static/blocks-media',
            to: 'static/blocks-media'
        }]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-gui/dist/extension-worker.js'
        }]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-gui/dist/extension-worker.js.map'
        }]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-gui/dist/static/assets',
            to: 'static/assets'
        }])
    ])
        .concat(process.env.NODE_ENV === 'production' ? [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            })
        ] : [])
        .concat([
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"' + (process.env.NODE_ENV || 'development') + '"',
                'process.env.SENTRY_DSN': '"' + (process.env.SENTRY_DSN || '') + '"',
                'process.env.API_HOST': '"' + (process.env.API_HOST || 'https://api.scratch.mit.edu') + '"',
                'process.env.SCRATCH_ENV': '"' + (process.env.SCRATCH_ENV || 'development') + '"'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                filename: 'js/common.bundle.js'
            })
        ])
};
