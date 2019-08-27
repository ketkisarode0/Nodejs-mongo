const mongoose = require("mongoose");
const mongoDBErrors = require("mongoose-mongodb-errors");
const Joi = require("joi");


const bookSchema = mongoose.Schema({
    name: String,
    author: String
    });

mongoose.plugin(mongoDBErrors);
module.exports = mongoose.model('Book', bookSchema)