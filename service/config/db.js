const mongoose = require('mongoose');
const { UserSchema } = require('../models');
require('dotenv').config();

const connection = {};
const MONGO_CONFIG = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 0,
};

connection.db = mongoose.createConnection(process.env.MONGO_URL, MONGO_CONFIG, (err) => {
  if (err) throw err;
  console.log(`Mongo DB connection started on ${process.env.MONGO_URL}`);
});

connection.models = {};
connection.models.user = connection.db.model('User', UserSchema);

module.exports = connection;
