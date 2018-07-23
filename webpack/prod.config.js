const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolve = require('./resolve');

const baseConfig = require('./base.config');

const prodConfig = {
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],
  module: {
    rules:[{
      test: /\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ]
    }]
  },
  // optimization: {
  //   minimize: false,
  // },
};

module.exports = merge(baseConfig, prodConfig);
