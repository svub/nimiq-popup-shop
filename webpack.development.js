const path = require('path');
const {common, PATHS} = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = Object.assign({}, common, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:3333',
    'webpack/hot/only-dev-server',
    path.join(__dirname, `${PATHS.src}/index.ts`)
  ],
  devServer: {
    inline: true,
    progress: true,
    port: 3333,
    stats: 'errors-only',
    contentBase: PATHS.src,
    hot: true
  },
  cache: true,
  devtool: 'eval-source-map',
});

config.plugins.push(
  new HtmlWebpackPlugin({
    template: path.join(__dirname, `${PATHS.src}/index.html`),
    inject: 'body',
    cache: false,
    favicon: path.join(__dirname, `${PATHS.src}/favicon.ico`)
  }),
  new Dotenv({
    path: './.env.development',
    defaults: true
  })
)

module.exports = config;
