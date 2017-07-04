const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('api/config');
const { host, database, port, username, password } = config.mongodb.connection;

mongoose.Promise = Promise;

mongoose.connect(host, database, port, {
  user: username,
  pass: password,
});

module.exports = mongoose;