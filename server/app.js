import express from "express";
import expressValidator from "express-validator";
import bodyParser from "body-parser";
import path from "path";
import session from "express-session";
import mongo from "connect-mongo";
import { connect } from "mongoose";
import passport from "passport";
import flash from "express-flash";

import { MONGODB_URI, SESSION_SECRET } from "./util/secrets"; // Need it to load process.env
import { logger, errLogger } from "./util/logger";
import routes from "./routes/routes";

const MongoStore = mongo(session);
const app = express();

connect(
  MONGODB_URI,
  { useNewUrlParser: true }
)
  .then(() => {
    console.log("** DB connection open");
  })
  .catch(error => {
    console.log(`** Connection error: ${error}`);
  });

// Express configuration
app.use(express.static(path.resolve(__dirname + "/public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: MONGODB_URI,
      autoReconnect: true
    })
  })
);

// Auth
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (
    !req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)
  ) {
    req.session.returnTo = req.path;
  } else if (req.user && req.path == "/account") {
    req.session.returnTo = req.path;
  }
  next();
});

// Routes
app.use(logger()); // Logs every request
routes(app);
app.use(function(req, res) {
  console.log("** HTTP Error - 404 for request: " + req.url);
  res.status(404).send("Sorry cant find that!");
});
app.use(errLogger()); // Logs error after request

export default app;
