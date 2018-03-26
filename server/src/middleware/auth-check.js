import jwt from 'jsonwebtoken';
import path from 'path';
import models from '../models';

var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

/**
 *  The Auth Checker middleware function.
 */
const AuthCheckMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.tokenSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.userId;

    // check if a user exists
    models.User.findById(userId)
      .then(user => {
        if (user !== null) {
          return next();
        }
        return res.status(401).end();
      })
      .catch(err => {
        return res.status(401).end();
      })
  });
};

export default AuthCheckMiddleware;
