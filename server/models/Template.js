const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  // These correspond to the user creating the profile
  userId: {
    type: String,
    required: true,
  },
});

const template = mongoose.model("template", templateSchema);
module.exports = template;
