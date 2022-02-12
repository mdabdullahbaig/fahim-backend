const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comment = mongoose.model("Comment", comment);

module.exports = Comment;
