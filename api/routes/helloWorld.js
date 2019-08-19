const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        json:"Hello World"
    });
});

router.post('/', (req, res, next)=>{
    
    res.status(200).json({
        message: "Hello",
        
      
    });
}); 


module.exports = router;