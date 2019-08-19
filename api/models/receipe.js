const mongoose = require("mongoose");

const receipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Receipe', receipeSchema)