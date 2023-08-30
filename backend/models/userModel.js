const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_At: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

// middleware
// remove version key in every query
userSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
