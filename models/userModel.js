const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  secret: String,
});

const User = mongoose.model("User", user);

module.exports = User;
