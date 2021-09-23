const passport = require('passport')
const { authenticateUser } = require('../controllers/auth')
const localStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
  'login',
  new localStrategy(
    {
      email: 'email',
      password: 'password'
    },
    authenticateUser
  )
)

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.PRIVATE_KEY,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error)
      }
    }
  )
)