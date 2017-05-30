const webpackConfig = require('@ionic/app-scripts/config/webpack.config');
const { envConfig } = require('./package.json');
const webpack = require('webpack');
let selectedEnv = envConfig[process.env.NODE_ENV];
if(!selectedEnv) throw new Error("Config has been parsed incorrectly.");

webpackConfig.plugins.push(new webpack.DefinePlugin({
  '__CONFIG__': selectedEnv
}));

module.exports = webpackConfig;
