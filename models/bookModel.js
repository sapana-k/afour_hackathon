const { ObjectId, Int32 } = require("mongodb");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://afour:afour@afourhackathon.6wbfog6.mongodb.net/",
  {
      dbName: "LibraryManagementApp",
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
console.log("DB Connected successfully");
});
const bookSchema = new mongoose.Schema({
  bookCode: Number,
  bookTitle: String,
  bookAuthor: String,
  bookDesc: String
});  
const BookModel = mongoose.model('book', bookSchema);
module.exports = BookModel;
