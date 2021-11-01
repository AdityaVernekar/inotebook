const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const {Schema} = require('mongoose');
const { body, validationResult } = require('express-validator');

router.post('/',[
    body('email').isEmail().withMessage("enter a valid email"),
    body('password').isLength({ min: 8 }).withMessage('alteast 8 characters'),
    body('name').isLength({ min: 3 }).withMessage('alteast 3 characters'),

   
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password,name} = req.body;
    User.findOne({email}).then(user=>{
        if(user){
            return res.status(400).json({msg:"user already exists"});
        }
        const newUser = new User({
            name,
            email,
            password
        });
        newUser.save().then(user=>{
            res.json(user);
        }).catch(err=>console.log(err));
    }).catch(err=>console.log(err));

    // res.send('user created');

    
})
module.exports = router;