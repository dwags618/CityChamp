import models from '../models';
import { Strategy as PassportLocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {

  var hash = bcrypt.hashSync(req.body.password.trim(), 10);

  const userData = {
        username: req.body.username,
        name: req.body.name,
        password: hash
      };

  models.User.findOne({
    where: {
      username: req.body.username,
      name: req.body.name
    }
  }).then(function(user) {
    if (!user) {
      return done(!null, false, {
        message: 'Username does not exist in database'
      });
    }

    else if (req.body.password !== req.body.confirmpassword) {
      return done(!null, false, {
        message: 'Password and confirm password are not the same'
      });
    }

    else {
     
    

      models.User.update(userData, {where: {username: req.body.username}, name: req.body.name})
    .then(()=>{
      return done(null);
    })
    .catch((err)=>{
      return done(err);
    });
    }
  })
});
