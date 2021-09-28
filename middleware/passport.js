require("dotenv").config();
const passport = require("passport");
const { authenticateUser } = require("../controllers/auth");
const express = require("express");
const app = express();
const flash = require("connect-flash");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

const passportMiddleware = () => {
  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => {
        cb(err);
      });
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      authenticateUser
    )
  );
};
// passport.use(
//   new JWTstrategy(
//     {
//       secretOrKey: process.env.PRIVATE_KEY,
//       jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
//     },
//     async (token, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         done(error)
//       }
//     }
//   )
// )

module.exports = passportMiddleware;
