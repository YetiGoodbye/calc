const path = require('path')
const webpack = require('webpack')

function resolve(relativePath) {
  return path.join(__dirname, '/../' + relativePath)
}

const webpackConfigBase = {
  entry: resolve('app/index.js'),
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash:4].js',
    chunkFilename: 'chunks/[name].[hash:4].js',
  },
  // resolve: {
  //   extensions: ['.js', '.json'],
  //   alias: {
  //     components:  resolve('/../app/components'),
  //     actions:     resolve('/../app/actions'),
  //     api:         resolve('/../app/api'),
  //     reducers:    resolve('/../app/reducers'),
  //     utils:       resolve('/../app/utils'),
  //     controllers: resolve('/../app/controllers'),
  //     style:       resolve('/../app/style'),
  //     images:      resolve('/../app/images'),
  //   },
  // },
  // resolveLoader: {
  //   moduleExtensions: ['-loader']
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js[x]?$/,
  //       exclude: /node_modules/,
  //       loader: 'babel',
  //     },
  //     {
  //       test: /\.css/,
  //       loader: ExtractTextPlugin.extract({
  //         fallback: 'style',
  //         use: [
  //           { loader: 'css', options: { sourceMap: true } }
  //         ]
  //       }),
  //     },
  //     {
  //       test: /\.less$/,
  //       loader: ExtractTextPlugin.extract({
  //         fallback: 'style',
  //         use: [
  //           { loader: 'css', options: { sourceMap: true } },
  //           { loader: 'less', options: { sourceMap: true } }
  //         ]
  //       }),
  //     },
  //     {
  //       test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  //       loader: 'url',
  //       options: {
  //         limit: 8192,
  //         name: 'img/[name].[hash:4].[ext]'
  //       }
  //     },
  //     {
  //       test: /\.(woff|eot|ttf|svg|gif)$/,
  //       loader: 'url',
  //       options: {
  //         limit: 8192,
  //         name: 'font/[name].[hash:4].[ext]'
  //       }
  //     },
  //   ],
  // },
  plugins: [
    // new ExtractTextPlugin('style.[hash:4].css'),
    new HtmlWebpackPlugin({
      template: resolve('../app/index.html'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'client', // 入口文件名
      filename: 'common.bundle.js', // 打包后的文件名
      minChunks: function (module, count) {
        return module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(resolve('../node_modules')) === 0
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      minChunks: 3,
    }),
  ]
}

module.exports = webpackConfigBase
