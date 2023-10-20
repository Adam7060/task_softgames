const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/boot.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer:{
    static: "./"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};