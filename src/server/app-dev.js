import path from "path";
import webpack from "webpack";
import express from "express";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.dev.config.js";

export default () => {
  const app = express(),
    compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );

  return app;
};
