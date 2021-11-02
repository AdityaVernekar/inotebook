const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require("express-validator");
// ROUTE 1: fetch all notes :GET /notes
router.get('/fetchallnotes',fetchuser,(req,res)=>{
      Notes.find({user:req.user})
      .then((notes)=>{
         res.json(notes);
      })
      .catch(err=>{
         res.json(err);
      })
   });

   // ROUTE 2 :add new note :POST /notes
   router.post('/addnote',fetchuser,[
      body('title','enter a valid title ').not().isEmpty().isLength({min:3}),
      body('description','enter a valid body').isLength({min:5})
   ],(req,res)=>{
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      const newNote = new Notes({
         title:req.body.title,
         description:req.body.description,
         tag:req.body.tag,
         user:req.user._id
      })
      newNote.save().then(note=>{
         res.send(note);
      })
      .catch(err=>{
         res.json(err);
      })
   })
   // ROUTE 3 :update note :PUT /notes/:id
   router.put('/updatenote/:id',fetchuser,[
      body('title','enter a valid title ').not().isEmpty().isLength({min:3}),
      body('description','enter a valid body').isLength({min:5})
   ],(req,res)=>{
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      Notes.findOneAndUpdate({_id:req.params.id,user:req.user._id},{
         title:req.body.title,
         description:req.body.description,
         tag:req.body.tag
      })
      .then(note=>{
         res.send(note);
      })
      .catch(err=>{
         res.json(err);
      })
   })
module.exports = router;