const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(relativePath) {
  return path.join(__dirname, '/../' + relativePath)
}

module.exports = {
  mode: 'development',
  entry: resolve('app/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
  },
  module: {
    rules:[{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },{
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('webpack/index.html'),
      title: 'Custom template',
    }),
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: 'development',
    //   DEBUG: false
    // }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    port:8001,
    hot: true,
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
