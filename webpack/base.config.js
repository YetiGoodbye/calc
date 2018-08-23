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
        Utils:      resolve(env.base, 'app/utils/'),
        Store:      resolve(env.base, 'app/store/'),
        Selectors:  resolve(env.base, 'app/selectors/'),
        Loaders:    resolve(env.base, 'loaders'),
      },
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules:[{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',   
      },{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'cleanup-debug-loader',
      },{
        test: /\.graphml$/,
        exclude: /node_modules/,
        use: [{
          loader: resolve(env.base, 'loaders/graphml-loader'),
          // options: {printOutput: true},
        }],
      }]
    },
  };
}


module.exports = createBaseConfig;
