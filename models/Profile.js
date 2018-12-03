const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  place: {
    type: String
  },
  describe: {
    type: String
  },
  grade: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  handler: {
    type: String,
    required: true
  },
  deadline: {
    type: Date
  },
  condition: {
    type: String
  },
  monitor: {
    type: String
  },
  rectify: {
    type: String
  },
  remark: {
    type: String,
  },
  image1: {
    type: String
  },
  image2:{
    type: String
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
