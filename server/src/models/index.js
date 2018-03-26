import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import Sequelize from 'sequelize';

var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

mkdirp(path.dirname(config.storage), err => {});

var sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.error('Database error: ', err);
  });

var db = {};

db['User'] = sequelize.import(path.join(__dirname, 'user.model.js'));
db['Maps'] = sequelize.import(path.join(__dirname, 'maps.model.js'));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
