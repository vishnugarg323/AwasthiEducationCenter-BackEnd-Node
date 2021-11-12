const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: false
  },
  device_details: {
    type: String,
    default: null
  }
},
{
  timestamps: {
    createdAt: 'created_time',
    updatedAt: 'last_updated_time'
  }
});
userModel.index({email: 1});

const User = mongoose.model('users', userModel);
module.exports = User;
