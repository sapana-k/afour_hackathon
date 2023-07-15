const express = require('express');
const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); //To receive input values of a form
const bookModel = require("./models/book");

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.listen(8000, ()=>{
    console.log("Connected - app running at port 8000")
})

app.get("/hey",(req,res)=> {
    res.render("home", { variableName: "Hello!" })
})

//connect to mongoDB
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

//we can handle form data using the request object
app.use( bodyParser.json() );      
    app.use(bodyParser.urlencoded({    
         extended: true
}));


//passing book array to frontend
const books = [{
    bookCode: 240,
    bookTitle: "Rudest Book Ever",
    bookAuthor: "Shwetabh Gangwar",
    bookDesc: "rude self help book",
},
{
    bookCode: 102,
    bookTitle: "Do Epic Shit",
    bookAuthor: "Ankur warikoo",
    bookDesc: "self help book, time management",
}
]

//display data
app.get("/", async (req, res) => {
    res.render("displayBooks", {
        data: books
    })
});

// app.get("/", async (req, res) => {
//     const books = await bookModel.find();
//     try {
//         res.render("displayBooks", {
//             data: books
//         })
//         res.send(db.Books.find({bookTitle:"Do Epic Shit"}));
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });

app.post("/add", (req, res) => {
    const inputBookCode = req.body.bookCode
    const inputBookTitle = req.body.bookTitle
    const inputBookAuthor = req.body.bookAuthor
    const inputBookDesc = req.body.bookDesc
    
    books.push({
        bookCode: inputBookCode,
        bookTitle:inputBookTitle,
        bookAuthor: inputBookAuthor,
        bookDesc:inputBookDesc
    })
    res.render("displayBooks", {
        data: books
    })
 })


 app.post('/delete', (req, res) => {
    var requestedBookTitle = req.body.bookTitle;
    var j = 0;
    
    books.forEach(book => {
        j = j + 1;
        if (book.bookTitle == requestedBookTitle) {
            books.splice((j - 1), 1)
        }
    })
    res.render("displayBooks", {
        data: books
    })
 })



