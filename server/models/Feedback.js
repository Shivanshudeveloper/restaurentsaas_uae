const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const menu = mongoose.model("feedback", menuSchema);
module.exports = menu;
