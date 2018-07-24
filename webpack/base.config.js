const resolve = require('path').resolve;

function createBaseConfig(env){
  return {
    entry: resolve(env.base, 'app/index.js'),
    module: {
      rules:[{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }]
    },
  };
}


module.exports = createBaseConfig;
