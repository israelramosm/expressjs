const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const outputDirectory = "dist/public";

module.exports = {
  entry: {
    main: "./src/client/index.js"
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    publicPath: "/",
    filename: "[name].js"
  },
  target: "web",
  devtool: "#source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      excludeChunks: ["server"]
    }),
    new CopyWebpackPlugin([
      { from: "./public/styles/**/*", to: "../" },
      { from: "./public/manifest.json", to: "./" }
    ]),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
