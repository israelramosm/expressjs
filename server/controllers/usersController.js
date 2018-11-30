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
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password cannot be blank").notEmpty();
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  console.log(`${loginDebug} post Login endpoint`);
  if (errors) {
    req.flash("errors", errors);
    req.send("should redirect to /login");
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      req.flash("errors", info.message);
      // return res.redirect("/login");
      req.send("NOT Authenticated redirecting to login");
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      // res.redirect(req.session.returnTo || "/");
      res.send("Authenticated redirect to current page or root");
    });

    console.log(`${loginDebug} post Login  authenticate passport endpoint`);
  })(req, res, next);
};

/**
 * GET /api/v1/logout
 * Log out.
 */
export let getLogout = (req, res) => {
  req.logout();
  // res.redirect("/");
  res.send(`User hits logout!\n`);
};

/**
 * GET /signup
 * Signup page.
 */
export let getSingup = (req, res) => {
  res.send(`User singup page!\n`);
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
 * GET /account
 * Profile page.
 */

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
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */

/**
 * GET /reset/:token
 * Reset Password page.
 */

/**
 * POST /reset/:token
 * Process the reset password request.
 */

/**
 * GET /forgot
 * Forgot Password page.
 */

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
