const path = require('path')
const { common, PATHS } = require('./webpack.common')
const Dotenv = require('dotenv-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = Object.assign({}, common, {
  mode: 'production',
  entry: [path.join(__dirname, `${PATHS.src}/index.ts`)],
  output: {
    path: path.join(__dirname, '/docs/'),
    pathinfo: true,
    publicPath: '/',
  },
})

config.plugins.push(
  new Dotenv({
    path: './.env.production',
    defaults: true,
  }),
  new CopyWebpackPlugin([
    // demo shop
    {
      from: 'dist/*',
      flatten: true,
    },
    {
      from: 'src/common.css',
    },
    // backend
    {
      from: 'src/backend/*',
      to: 'backend/',
      flatten: true,
      ignore: '*.ts',
    },
    {
      from: 'src/backend/wasm/*',
      to: 'backend/wasm/',
      flatten: true,
    },
    {
      from: 'src/nimiq-pop-up-shop-configuration.json',
    },
  ]),
)

module.exports = config
