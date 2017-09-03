var helpers = require('./helpers');
var webpack = require('webpack');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = function (options) {
  isProd = options.env === 'prod';

  return {
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts'
    },
    resolve: {
      extensions: ['*', '.js', '.ts'],
    },
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular-router-loader',
            'angular2-template-loader'
          ]
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: [helpers.root('src', 'styles')]
        },
      ]
    },
    plugins: [
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core/,
        helpers.root('./src'), // location of your src
        { }
      ),
      new CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body',
        title: 'Angular Nimble Starter',
        favicon: 'assets/images/favicon.png',
        showErrors: true
      })
    ],
  };
};