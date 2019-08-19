const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Receipe = require('../models/receipe')

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "Reciepe Orderd"
    });
});

router.post('/', (req, res, next)=>
{
    const receipe = new Receipe({
        _id: new mongoose.Types.ObjectId(),
        name: 'ketki',
        price: 22

    })
    receipe.save()
    .then(result=>
        {
            console.log(result)
        })
    .catch(err=>{
            console.log(err);
        });
    res.status(201).json({
        message: "Ored by id"
    });
});

router.post('/:orderId', (req, res, next)=>
{
    res.status(201).json({
        message: "Ored was created",
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next)=>
{
    res.status(201).json({
        message: "Ored was Deleted",
        orderId: req.params.orderId
    });
});
module.exports = router;