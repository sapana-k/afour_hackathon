
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  code: Number,
  title: String,
  author: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Book", bookSchema);