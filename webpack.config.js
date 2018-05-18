const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: "./src/id.ts",
  // devtool: "inline-source-map",
  module: {
    rules: [
      {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
      },
      {
          test: /\.js$/, 
          loader: "babel-loader",
          exclude: /node_modules/
      }
    ]
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins:[
    new uglify()
  ],
  output: {
    filename: "id.min.js",
    libraryTarget: "umd"
  }
};
