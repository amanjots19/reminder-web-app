const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  Description: String,
  Date: String,
  Time: String,
  email: String,
});

module.exports = mongoose.model("User", UserSchema);
