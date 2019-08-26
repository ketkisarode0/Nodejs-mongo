const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Book = require("../models/books");

router.get("/", (req, res, next) => {
  var message;
  Book.find()
    .exec()
    .then(doc => {
      console.log(doc);
      message = doc;
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
    })
    .catch(err => {
        console.log(err);
        res.status(202).json({
          error: err,
          message: "Processing"
          
        });
      });

});

router.post("/", (req, res, next) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    author: req.body.author
  });
//   const { error } = validateBook(req.body);
//   if (error){
//     res.status(400).send(error.details[0].message)
//     }
  book
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST Request/ books",
        book: book
      });
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "Internal server error"
      });
     
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({
            error:err,
            message:"Bad Request"
        })
    })
});

router.delete("/:bookId", (req, res, next) => {
  const id = req.params.bookId;
  Book.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(40).json({
        error: err
      });
    });
});

router.get("/:bookId", (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
    .exec()
    .then(doc => {
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
});

// function validateBook(book) {
//     const schema = {
//     name: Joi.string().min(3).required(),
//     author: Joi.string().min(3).required()

//     };
//     return Joi.validate(book, schema);
    
     
//     }
module.exports = router;
