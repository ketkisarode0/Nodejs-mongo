const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const Book = require("../models/books");

exports.books_get_all = (req, res, next) => {
  var message;
  Book.find()
    .exec()
    .then(doc => {
      doc = JSON.stringify(doc);
      doc = doc.replace(/\"_id\":/g, '"id":');
      console.log(JSON.parse(doc));
      doc = JSON.parse(doc);
      // console.log(doc);
      // message = doc;
      res.status(200).json({
        message: doc
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "Internal server error"
      });
    });
};

exports.books_create_book = (req, res, next) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    author: req.body.author
  });

  const Schema = Joi.object().keys({
    name: Joi.string().required(),
    author: Joi.string().required()
  });

  Joi.validate(req.body, Schema, (err, result) => {
    if (!err) {
      book.save().then(result => {
        result = JSON.stringify(result);
        result = result.replace(/\"_id\":/g, '"id":');
        console.log(JSON.parse(result));
        result = JSON.parse(result);
        console.log(result);

        res.status(201).json({
          message: "Handling POST Request/ books",
          book: result
        });
        return result;
      });
    } else {
      console.log(err);
      res.status(400).json({
        // error: err,
        message: "Bad Request",
        description: err.details
      });
    }
  });
};

exports.books_delete_book = (req, res, next) => {
  const id = req.params.bookId;
  Book.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        error: err
      });
    });
};

exports.books_get_book = (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
    .exec()
    .then(doc => {
      doc = JSON.stringify(doc);
      doc = doc.replace(/\"_id\":/g, '"id":');
      console.log(JSON.parse(doc));
      doc = JSON.parse(doc);
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        error: err,
        message: "The server can not find the requested page"
      });
    });
};

module.exports = router;
