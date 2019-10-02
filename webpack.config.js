const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const PATHS = {
	src: './src/'
}

module.exports = (env = {}) => {
  const IS_DEV = env.production !== true
  return {
    entry: [
      path.join(__dirname, `${PATHS.src}/index.ts`)
    ],
    output: {
      path: path.join(__dirname, '/dist/'),
      pathinfo: true,
      filename: 'nimiq-shop.js',
      publicPath: '/'
    },
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
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${PATHS.src}/index.html`,
        inject: 'body',
        cache: false,
        favicon: `${PATHS.src}/favicon.ico`
      }),
      new Dotenv({
        path: IS_DEV ? './.env.development' :  './.env.production',
        defaults: true
      })
    ], 
    devServer: {
      inline: true,
      progress: true,
      port: 3333,
      stats: 'errors-only',
      contentBase: PATHS.src
    }
  }
};
