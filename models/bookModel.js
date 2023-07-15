const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookCode: Number,
  bookTitle: String,
  bookAuthor: String,
  bookDesc: String
});  
const BookModel = mongoose.model('book', bookSchema);
module.exports = BookModel;
