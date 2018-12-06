import path from "path";
import webpack from "webpack";
import express from "express";
import webpackDevMiddleware from "webpack-dev-middleware";
import config from "../../webpack.dev.config.js";

export default () => {
  const app = express(),
    DIST_DIR = __dirname,
    outputDirectory = "/public",
    HTML_FILE = path.join(DIST_DIR, `${outputDirectory}/index.html`),
    compiler = webpack(config);

  console.log(HTML_FILE);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );

  return app;
};
