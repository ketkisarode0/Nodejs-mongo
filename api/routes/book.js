const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Book = require('../models/book')

router.get('/', (req, res, next)=>{
    var message;
    Book.find()
        .exec()
        .then(doc=>{
            console.log(doc);
            message = doc;
            res.status(200).json({
                message: doc
            })
        })
        .catch(err=>
            {
                console.log(err);
                res.status(500).json({
                    error:err,
                    message: 'Internal server error'
                });
            }) 
});

router.post('/', (req, res, next)=>{
   
      const book = new Book({
         _id: new mongoose.Types.ObjectId(),
         name: req.body.name,
        author: req.body.author

    })
    book.save()
    .then(result=>
        {
            console.log(result)
        })
    .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err,
                message: 'Internal server error'
            });
        });
    res.status(201).json({
        message: 'Handling POST Request/ books',
        book: book
        
        
   });
});


router.delete('/:bookId', (req , res, next)=> {
    const id = req.params.bookId;
    Book.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get('/:bookId', (req, res, next)=>{
    const id = req.params.bookId;
    Book.findById(id)
        .exec()
        .then(doc=>{
            console.log(doc);
            if(doc == null){
                res.status(404).json({
                    message:'Can not find this id'
                });
            }
            res.status(200).json(doc);
        })
        .catch(err=>{
            
                console.log(err);
                res.status(500).json({
                    error:err
                });
            
            })
    
});

module.exports = router;