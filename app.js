var express = require('express')
var app = express();
var timeout = require('connect-timeout')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require("express-async-errors");
const bookRoutes = require('./api/routes/books');
const receipeRoutes = require('./api/routes/receipe');
const helloWorldRoutes = require('./api/routes/helloWorld');
app.use(timeout('3s'))
mongoose.Promise = global.Promise;

var promise = mongoose.connect('mongodb://localhost/receipeBlog', {
    useNewUrlParser: true,
});

promise.then(function(db){ 
  console.log('DATABASE CONNECTED!!');
}).catch(function(err){
  console.log('CONNECTION ERROR', err);
});



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/books', bookRoutes);
app.use('/receipe', receipeRoutes);
app.use('/',helloWorldRoutes);


app.use((req,res,next) => {
    req.status = 404;
    const error = new error('routes not found');
    message: 'path not found';
    next(error);
})

app.use((error, req,res,next) => {
    res.status(req.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;