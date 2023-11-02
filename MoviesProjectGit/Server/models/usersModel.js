const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    FullName: { type: String, required: true },
    UserName: { type: String, required: true },
    PassWord: { type: Number, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
