import path from "path";
import webpack from "webpack";
import express from "express";
import webpackDevMiddleware from "webpack-dev-middleware";
import config from "../../webpack.dev.config.js";

export default () => {
  const app = express(),
    DIST_DIR = __dirname,
    // outputDirectory = "/public",
    HTML_FILE = path.join(DIST_DIR, "index.html"),
    compiler = webpack(config);

  console.log(process.env.NODE_ENV);
  console.log(config.output.publicPath);
  console.log(HTML_FILE);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
  app.get("*", (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  });

  return app;
};
