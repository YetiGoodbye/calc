const webpack = require('webpack');

const resolve = require('./resolve');

const baseConfig = {
  entry: resolve('app/index.js'),

  module: {
    rules:[{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
};

module.exports = baseConfig;
