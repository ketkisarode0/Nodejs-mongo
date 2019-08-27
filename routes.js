const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const Book = require("./api/models/books");

const BooksController = require('./api/handler/books');

router.get("/", BooksController.books_get_all);

router.post("/", BooksController.books_create_book);

router.delete("/:bookId", BooksController.books_delete_book);

router.get("/:bookId", BooksController.books_get_book);

module.exports = router;