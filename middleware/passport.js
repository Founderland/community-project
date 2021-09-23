const passport = require("passport");
const { authenticateUser } = require("../controllers/auth");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

exports.module = passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    authenticateUser
  )
);

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
