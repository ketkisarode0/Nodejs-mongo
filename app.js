var express = require('express')
var app = express();
var timeout = require('connect-timeout')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require("express-async-errors");
const bookRoutes = require('./api/routes/book');
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

//  app.use((req, res, next)=>{
//      res.header('Access-Control-Allow-Origin', "*");
        

//          res.header(
//     'Access-Control-Allow-Headers', 
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization' 
//     );
//     if (req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
//         return res.status(200).json({});
//     }
//     next();
// })

app.use('/book', bookRoutes);
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