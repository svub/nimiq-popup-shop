const path = require('path')
const { common, PATHS } = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const config = Object.assign({}, common, {
  mode: 'production',
  entry: [path.join(__dirname, `${PATHS.src}/index.ts`)],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
})

config.plugins.push(
  new HtmlWebpackPlugin({
    template: `${PATHS.src}/index.html`,
    inject: 'body',
    cache: false,
    favicon: `${PATHS.src}/favicon.ico`,
    minify: true,
  }),
  new Dotenv({
    path: './.env.production',
    defaults: true,
  }),
)

module.exports = config
