const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    City: { type: String, required: true },
  },
  { versionKey: false }
);

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
