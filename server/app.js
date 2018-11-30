import express from "express";
import bodyParser from "body-parser";
import path from "path";
import "./util/secrets";

const app = express();

// Express configuration

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

export default app;
