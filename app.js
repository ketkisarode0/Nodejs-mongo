const express = require("express");
const app = express();
const timeout = require("connect-timeout");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const renameIdPlugin = require('mongoose-rename-id');
// require("express-async-errors");
const Joi = require('joi');
const morgan = require('morgan')
const bookRoutes = require("./api/handler/books");
// const Book = require("./routes");
app.use(timeout("3s"));
app.use(morgan('dev'))
mongoose.Promise = global.Promise;

var promise = mongoose.connect("mongodb://localhost/receipeBlog", {
  useNewUrlParser: true
});

promise
  .then(function(db) {
    console.log("DATABASE CONNECTED!!");
  })
  .catch(function(err) {
    console.log("CONNECTION ERROR", err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/books", bookRoutes);  

app.use((req, res, next) => {
  req.status = 404;
  const error = new error("routes not found");
  message: "path not found";
  next(error);
});

app.use((error, req, res, next) => {
  res.status(req.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
