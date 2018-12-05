const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const globals = require("./env-globals.config");

module.exports = {
  entry: "./src/server/server.js",
  output: {
    path: path.join(__dirname, "../dist"),
    // publicPath: "/",
    filename: "server.js"
  },
  target: "node",
  node: {
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        SESSION_SECRET: JSON.stringify(globals.SESSION_SECRET),
        MONGODB_URI: JSON.stringify(globals.MONGODB_URI),
        PORT: JSON.stringify(globals.PORT),
        BASE_API: JSON.stringify(globals.BASE_API),
        v1_API: JSON.stringify(globals.v1_API),
        v2_API: JSON.stringify(globals.v2_API)
      }
    })
  ]
};
