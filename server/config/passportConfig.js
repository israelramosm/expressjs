import passport from "passport";
import passportLocal from "passport-local";
import * as _ from "lodash";

import User from "../models/userModel";

const LocalStrategy = passportLocal.Strategy;

/** Maybe in the future */
// const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) return done(err);

      if (!user)
        return done(undefined, false, { message: `Email ${email} not found.` });

      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);

        if (isMatch) return done(undefined, user);

        return done(undefined, false, {
          message: "Invalid email or password."
        });
      });
    });
  })
);

/**
 * Login Required middleware.
 */
export const isAuthenticated = (req, res, next) => {
  // TODO: implement with client
  if (req.isAuthenticated()) {
    return next("Access granted");
  }
  res.redirect("/api/v1/login");
};

/**
 * Authorization Required middleware.
 */
export const isAuthorized = (req, res, next) => {
  const provider = req.path.split("/").slice(-1)[0];
  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
