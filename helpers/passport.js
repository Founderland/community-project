const { Strategy, ExtractJwt } = require('passport-jwt')
const passport = require('passport')
const User = require('../models/User')
const underscoreId = '_id'

const applyPassportStrategy = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.PRIVATE_KEY;
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findOne({ email: payload.email }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, {
            email: user.email,
            _id: user[underscoreId],
          });
        }
        return done(null, false);
      });
    })
  );
};

module.exports = {applyPassportStrategy}