const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const { secret, expireIn, algorithm } = require('../config/config').jwt;
const jwt = require('jsonwebtoken');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithm: algorithm,
  secretOrKey: secret,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  })
);

/**
 * @name createToken
 * @param {Object} data - Object containing data which needs to be stored in token
 * @description Returns signed JWT token which can be given to client
 */
exports.createToken = (data) => {
  try {
    if (data === Object(data)) {
      return jwt.sign(data, secret, {
        algorithm: algorithm,
        expiresIn: expireIn,
      });
    } else {
      return new Error('Given data is not object.');
    }
  } catch (error) {
    return error;
  }
};
