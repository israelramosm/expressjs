import express from "express";
import bodyParser from "body-parser";
import path from "path";

import "./util/secrets"; // Need it to load process.env
import { logger, errLogger } from "./util/logger";

const app = express();

// Express configuration
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(logger());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.use(function(req, res) {
  console.log("** HTTP Error - 404 for request: " + req.url);
  res.status(404).send("Sorry cant find that!");
});
app.use(errLogger());

export default app;
