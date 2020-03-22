const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId, //reference to user model
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    // if  user delete account the post will not be removed
    type: String
  },
  likes: [
    {
      // make reference whenever we have something we need to know which user do that
      // here we need to know like belong to which user
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        require: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});
module.exports = mongoose.model("Post", PostSchema);
