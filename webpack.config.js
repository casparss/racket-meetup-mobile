const webpackConfig = require('@ionic/app-scripts/config/webpack.config');
const { envConfig } = require('./package.json');
const webpack = require('webpack');
let selectedEnv = envConfig[process.env.NODE_ENV];
if(!selectedEnv) throw new Error("Config has been parsed incorrectly.");

const configPlugin = new webpack.DefinePlugin({
  '__CONFIG__': selectedEnv
})

webpackConfig.dev.plugins.push(configPlugin);
webpackConfig.prod.plugins.push(configPlugin);

module.exports = webpackConfig;
