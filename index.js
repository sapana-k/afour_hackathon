const express = require('express');
const bodyParser = require('body-parser'); //To receive input values of a form
const mongoose = require("mongoose");

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

//connection to backend
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

//book model
const BookModel = require("./models/bookModel.js");
//student model
const studentModel = require("./models/studentModel.js");

//home page
app.get("/", async (req, res) => {
    res.render("home");
});

//display books
app.get("/books", async (req, res) => {
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
app.post("/addBook", (req, res) => {
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
 app.post('/deleteBook', (req, res) => {
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

 //update books
//  app.post('/updateBook', (req, res) => {
//     BookModel.deleteOne({ bookCode: req.body.bookCode })
//     .then(() => {
//         console.log('Document deleted successfully');
//     })
//     .catch((error) => {
//         console.error('Error deleting document:', error);
//     });
//     BookModel.find().then((books) => {
//         res.render("displayBooks", {
//             data: books
//         })
//     });
//  })

//display students
app.get("/students", async (req, res) => {
    try {
        studentModel.find().then((students) => {
            console.log(students);
            res.render("displayStudents", {
                data: students
            })
        })
    } catch (error) {
      res.status(500).send(error);
    }
  });

//add Students
app.post("/addStudent", (req, res) => {
    const newStudent = new studentModel({
        studentID: req.body.studentID,
        studentName:  req.body.studentName,
        studentEmail: req.body.studentEmail,
        studentPhone: req.body.studentPhone
    });
    newStudent.save().then((s) => {
        console.log('Student saved:', s);
    })
    .catch((error) => {
        console.error('Error saving Student:', error);
    });
    studentModel.find().then((s) => {
        res.render("displayStudents", {
            data: s
        })
    });
 })

 //delete Students
 app.post('/deleteStudent', (req, res) => {
    studentModel.deleteOne({ studentID: req.body.studentID })
    .then(() => {
        console.log('Document deleted successfully');
    })
    .catch((error) => {
        console.error('Error deleting document:', error);
    });
    studentModel.find().then((s) => {
        res.render("displayStudents", {
            data: s
        })
    });
 })

