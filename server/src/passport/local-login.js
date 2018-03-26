import jwt from 'jsonwebtoken';
import path from 'path';
import models from '../models';
import { Strategy as PassportLocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {

  models.User.findOne({
    where: {
      username: username,
    }
  }).then(function(user) {
    if (!user) {
      return done(!null, false, {
        message: 'Username does not exist'
      });
    }

    if (user) {
      bcrypt.compare(req.body.password, user.password,
        function(err, valid) {
          if(!valid) {
            const error = new Error('Incorrect username or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
          }
          const payload = { userId: user.id };

          const token = jwt.sign(payload, config.tokenSecret);

          return done(null, token);
        });
    }
  })
});
