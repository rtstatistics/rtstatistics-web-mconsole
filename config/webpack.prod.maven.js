var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var prodConfig = require('./webpack.prod.js');
var helpers = require('./helpers');


module.exports = webpackMerge(prodConfig, {
  output: {
    path: helpers.root('target/classes/META-INF/resources/webjars/rtstatistics-web-mconsole')
  }
});
