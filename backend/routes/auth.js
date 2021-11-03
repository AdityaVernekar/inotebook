const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { Schema } = require("mongoose");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const jwt_key = "amiteamizbtumi";
// ROUTE 1: register
router.post(
  "/createUser",
  [
    body("email").isEmail().withMessage("enter a valid email"),
    body("password").isLength({ min: 8 }).withMessage("alteast 8 characters"),
    body("name").isLength({ min: 3 }).withMessage("alteast 3 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //parameters from req.body: what user feeds in
    const { email, password, name } = req.body;
    //create a new user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    User.findOne({ email })
      .then((user) => {
        if (user) {
          return res.status(400).json({ error: "user already exists" });
        }
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
        });
        newUser
          .save()
          .then((user) => {

            const token = jwt.sign({ _id: user._id }, jwt_key);
            // console.log(token);
            res.json({ token });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    // res.send('user created');
  }
);

//ROUTE 2 :login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("enter a valid email"),
    body("password").isLength({ min: 8 }).withMessage("alteast 8 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ error: "user does not exist" });
        }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
          return res.status(400).json({ error: "invalid password" });
        }
        const token = jwt.sign({ _id: user._id }, jwt_key);
        res.json({ token });
      })
      .catch((err) => console.log(err));
  }
);
// ROUTE 3: get user
 router.post('/getuser',fetchuser,(req,res)=>{
  const {_id} = req.user;
  User.findOne({_id}).select('-password').then((user)=>{
    res.json(user);
  }).catch((err)=>console.log(err));
    
 })
module.exports = router;
