/* global process b:true */
/* global __dirname b:true */
/* eslint no-console: 0 */

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes';
import authRoutes from './src/routes/auth.route';
import authCheckMiddleware from './src/middleware/auth-check';
import models from './src/models';
import passport from 'passport';

var env = process.env.NODE_ENV || 'development';

// Set up the API server
var app = express();

app.set('port', (process.env.PORT || 80));

app.use(bodyParser.json({ type: 'application/json' }));

app.use(passport.initialize());

const localSignupStrategy = require('./src/passport/local-signup');
const localLoginStrategy = require('./src/passport/local-login');
const localResetStrategy = require('./src/passport/local-reset');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
passport.use('local-reset', localResetStrategy);


app.use('/api', authCheckMiddleware);
app.use('/api', routes);
app.use('/auth', authRoutes);

if ('production' == env) {
  console.log('In production');
  app.use(express.static(path.join(__dirname, 'static')));
  app.get('/[^.]+$', (req, res) => {
    res.set('Content-Type', 'text/html')
      .sendFile(path.join(__dirname, 'static', 'index.html'));
  });
}

app.listen(app.get('port'), () => {
  console.log(`Server is running at http://localhost:${app.get('port')}`)
})
