const express = require('express');
const bodyParser = require('body-parser'); //To receive input values of a form
const BookModel = require("./models/bookModel.js");

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.listen(8000, ()=>{
    console.log("Connected - app running at port 8000")
})


//we can handle form data using the request object
app.use( bodyParser.json() );      
    app.use(bodyParser.urlencoded({    
         extended: true
}));

//display books
app.get("/", async (req, res) => {
    try {
        BookModel.find().then((books) => {
            console.log(books);
            res.render("displayBooks", {
                data: books
            })
        })
    } catch (error) {
      res.status(500).send(error);
    }
  });

//add books
app.post("/add", (req, res) => {
    const newBook = new BookModel({
        bookCode: req.body.bookCode,
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        bookDesc: req.body.bookDesc,
    });
    newBook.save().then((book) => {
        console.log('Book saved:', book);
    })
    .catch((error) => {
        console.error('Error saving book:', error);
    });
    BookModel.find().then((books) => {
        res.render("displayBooks", {
            data: books
        })
    })
 })

 //delete books
 app.post('/delete', (req, res) => {
    BookModel.deleteOne({ bookCode: req.body.bookCode })
    .then(() => {
        console.log('Document deleted successfully');
    })
    .catch((error) => {
        console.error('Error deleting document:', error);
    });
    BookModel.find().then((books) => {
        res.render("displayBooks", {
            data: books
        })
    });
 })



