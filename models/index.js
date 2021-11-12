const { ObjectId } = require('bson');

module.exports = {
  user: require('./user'),
  ObjectId: require('mongoose').Types.ObjectId
}
