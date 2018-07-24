// const webpack = require('webpack');
const merge = require('webpack-merge');
const resolve = require('path').resolve;

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const resolve = require('./resolve');

const createBaseConfig = require('./base.config');

function createProdConfig(env){

  const baseConfig = createBaseConfig(env);

  const prodConfig = {
    mode: 'production',
    output: {
      path: resolve(env.base, 'dist'),
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

  return merge(baseConfig, prodConfig);
}




module.exports = createProdConfig;
