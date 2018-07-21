const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve(relativePath) {
  return path.join(__dirname, '/../' + relativePath)
}

module.exports = {
  mode: 'development',
  entry: resolve('app/index.js'),
  output: {
    // path: resolve('../dev'),
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
        // {
        // loader: MiniCssExtractPlugin.loader,
        // // options: {
        //   // you can specify a publicPath here
        //   // by default it use publicPath in webpackOptions.output
        //   // publicPath: '../'
        // // }
        // },
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    // new CleanWebpackPlugin([resolve('../dev')]),
    new HtmlWebpackPlugin({
      // title: 'My Site # 1',
      template: resolve('webpack/index.html'),
      title: 'Custom template',
    }),
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: 'development',
    //   DEBUG: false
    // }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: "style.[hash:8].css"
    // })
  ],
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: resolve('../dev'),
    // Load a custom template (lodash by default see the FAQ for details)
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
