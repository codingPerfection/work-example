const path = require('path');
const slsw = require('serverless-webpack');

Object.keys(slsw.lib.entries).forEach(key => {
  slsw.lib.entries[key] = ["babel-polyfill", slsw.lib.entries[key]];
});

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  externals: ['aws-sdk'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
        ],
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  }
};