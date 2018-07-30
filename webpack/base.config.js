const resolve = require('path').resolve;

function createBaseConfig(env){
  return {
    entry: resolve(env.base, 'app/index.js'),
    resolve: {
      alias: {
        // App:        resolve(env.base, 'app/'),
        Components: resolve(env.base, 'app/components/'),
        Actions:    resolve(env.base, 'app/actions/'),
        Reducers:   resolve(env.base, 'app/reducers/'),
        Config:     resolve(env.base, 'app/config/'),
        Constants:  resolve(env.base, 'app/constants/'),
        Utils:      resolve(env.base, 'app/utils/'),
      }
    },
    module: {
      rules:[{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',   
      },{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'cleanup-debug-loader',
      }]
    },
  };
}


module.exports = createBaseConfig;
