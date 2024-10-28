/** @type {import('webpack').Configuration} */

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, "src", "App.tsx"),
  mode: "production",
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(css)/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf)$/i,
        exclude: /node_modules/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "index.html"), to: "index.html" },
        // { from: path.resolve(__dirname, "static/"), to: "static/" },
      ],
      options: {
        concurrency: 100
      }
    }),
  ],
  resolve: {
    extensions: ['.css', '.js', '.jsx', '.tsx', '.ts'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'dist', 'client'),
    libraryTarget: "commonjs2"
  },
  optimization: {
    usedExports: true
  },
  devServer: {
    static: path.resolve(__dirname, '..', "dist", 'client')
  }
};