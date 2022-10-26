// Importing express packages
const express = require('express');

// Importing path package from standard library
const path = require('path');

// Assigning a port value
const PORT = process.env.PORT || 3000;

// Instantiating an express server
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Routes for different endpoints.
const booksRoutes = require("./routes/booksRouter");
app.use(booksRoutes);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './views/index.html'))
);

// Catch all for all unhandled routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, './views/404.html'))
});

// Setting express server to live
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);