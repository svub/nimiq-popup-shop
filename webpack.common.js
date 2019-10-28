const path = require('path');

const PATHS = {
  src: 'src/',
  dist: 'dist/',
}

const common = {
  output: {
    path: path.join(__dirname, '/dist/'),
    pathinfo: true,
    filename: 'nimiq-shop.js',
    publicPath: '/',
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
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [],
}

module.exports = {
  common,
  PATHS,
}
