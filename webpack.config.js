const path = require('path');

module.exports = {
  entry: './src/id.ts',
  module: {
    loaders: [
        { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'id.js',
    path: path.resolve(__dirname, 'dist')
  }
};