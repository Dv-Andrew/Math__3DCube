/**
 * Webpack configuration file
 */
const path = require('path');

const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;

const config = require('./config.json');
const mode = require('./mode.js');

const SRC = path.join(config.root.devDir, config.js.devDir);

module.exports = {
  mode: mode.isDevelopment ? 'development' : 'production',
  devtool: mode.isDevelopment ? 'inline-source-map' : false,
  watch: mode.isDevelopment,

  entry: `./${SRC}main.ts`,
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      include: path.join(__dirname, '..', '..', SRC)
    }]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ]
  },
  output: {
    filename: 'main.js'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
}