const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = merge(common, {
  mode: 'development',
  devtool: devMode ? 'eval' : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: 'localhost',
    hot: true,
    port: 4888,
    inline: true,
  }
  
});

