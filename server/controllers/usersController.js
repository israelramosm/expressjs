import passport from "passport";

import User from "../models/userModel";
const request = require("express-validator");

const loginDebug = "[v1 Login]";

/**
 * GET /api/v1/login
 * Login page
 */
export let getLogin = (req, res) => {
  res.send(`User login page!\n`);
};

/**
 * POST /api/v1/login
 * Sign in using email and password.
 */
export let postLogin = (req, res, next) => {
  // TODO: should validate here and on the client?
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password cannot be blank").notEmpty();
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const err = req.validationErrors();

  if (err) {
    req.flash("errors", err);
    return res.send({ msg: err });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      req.flash("errors", info.message);
      return res.send({ msg: info.message });
    }

    req.logIn(user, err => {
      if (err) return next(err);

      req.flash("success", { msg: "Success! You are logged in." });
      // TODO: test on client
      return res.redirect(req.session.returnTo || "/");
    });
  })(req, res, next);
};

/**
 * GET /api/v1/logout
 * Log out.
 */
export let getLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};

/**
 * POST /api/v1/signup
 * Create a new local account.
 */
export let postSignup = (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    // Have something to handle comun errors
    // Error Code 11000, Duplicate key
    if (err) res.send(err);

    // req.login();
    res.json(user);
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */

/**
 * POST /account/password
 * Update current password.
 */

/**
 * POST /account/delete
 * Delete user account.
 */

/**
 * POST /reset/:token
 * Process the reset password request.
 */

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */

 // TODO: check if the api bellow would been need it

/**
 * GET /signup
 * Signup page.
 */

/**
 * GET /account
 * Profile page.
 */

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */

/**
 * GET /reset/:token
 * Reset Password page.
 */

/**
 * GET /forgot
 * Forgot Password page.
 */
