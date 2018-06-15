const webpackConfig = require('@ionic/app-scripts/config/webpack.config');
const PrimusClientWebpackPlugin = require('primus-webpack-plugin')
const { envConfig } = require('./package.json');
const webpack = require('webpack');
let selectedEnv = envConfig[process.env.NODE_ENV];
if(!selectedEnv) throw new Error("Config has been parsed incorrectly.");

/**
 * Webpack plugins array
 */
const plugins = [
  new webpack.DefinePlugin({
    '__CONFIG__': selectedEnv
  }),

  new PrimusClientWebpackPlugin({
    filename: 'primus-client.js',
    minify: false,
    primusOptions: {
      transformer: 'uws',
      parser: {
        encoder: function (data, fn) {
          fn(null, JSON.stringify(data))
        },
        decoder: function (data, fn) {
          fn(null, JSON.parse(data))
        }
      },
      plugins: [
        { name: 'rooms', plugin: require('primus-rooms') },
        { name: 'emitter', plugin: require('primus-emitter') }
      ]
    }
  })
]

/**
 * This adds all plguins to the webpack config
 */
plugins.forEach(plugin => {
  webpackConfig.dev.plugins.push(plugin);
  webpackConfig.prod.plugins.push(plugin);
})

module.exports = webpackConfig;
