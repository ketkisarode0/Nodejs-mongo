const mongoose = require("mongoose");
const mongoDBErrors = require("mongoose-mongodb-errors");
const bookSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    author: String
});

mongoose.plugin(mongoDBErrors);
module.exports = mongoose.model('Book', bookSchema)