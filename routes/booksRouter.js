// Importing express packages
const express = require("express");

// Importing fs package from standard library
const fs = require("fs");

// Importing the DB
const books = require("../db/books.json");

// Instantiating router
const router = express.Router();

// GET Route for retrieving all books in JSON format
router.get("/api/books", (req, res) => {
  console.info(`${req.method} request received for books`);

  fs.readFile("./db/books.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      res.json(JSON.parse(data));
    };
  });
});

// GET Route for retrieving a single book by ID
router.get("/api/books/:id", (req, res) => {
  console.info(`${req.method} request received for a single book`);

  for (let i = 0; i < books.length; i++) {
    const thisBook = books[i];
    if(thisBook.id == req.params.id) {
      return res.json(thisBook);
    };
  };
  return res.status(404).send("No book with that ID number exists.");
});

router.post("/api/books", (req, res) => {
  console.info(`${req.method} request received for books`);
  console.log(req.body);

  // Destructuring assignment for the items in req.body
  const { id, title, author } = req.body;

  // If all the required properties are present
  if (id && title && author) {
    // Variable for the object we will save
    const newFeedback = {
      id,
      title,
      author
    };

    fs.readFile("./db/books.json", "utf-8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const booksArr = JSON.parse(data);
        booksArr.push(newFeedback);
        console.log(booksArr);
        fs.writeFile("./db/books.json", JSON.stringify(booksArr,null,4), (err, data) => {
          if (err) {
            throw err;
          }
          res.send("book added!");
        });
      }
    });

    const response = {
      status: 'success',
      body: newFeedback,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  };
});

module.exports = router;