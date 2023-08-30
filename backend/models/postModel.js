const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minLength: 5,
    maxLength: 1024
  },
  postedBy: {
    type: ObjectId,
    ref: 'User'
  },
  comments: [
    {
      comment: String,
      postedBy: {
        type: ObjectId,
        ref: "User"
      }
    }
  ],
  created_At: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

// middleware
// remove version key in every query
postSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
