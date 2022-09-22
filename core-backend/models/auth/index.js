const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "user" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
