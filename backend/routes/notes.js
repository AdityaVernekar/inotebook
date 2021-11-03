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
   router.put('/updatenote/:id',fetchuser, async (req,res)=>{

      let note = await Notes.findById(req.params.id);
      if(!note){
         return res.status(404).send('note not found');
      }
      if(note.user.toString()!==req.user._id.toString()){
         return res.status(401).send('unauthorized');
      }

      const updatenote = await Notes.findByIdAndUpdate(req.params.id,{
         title:req.body.title,
         description:req.body.description,
         tag:req.body.tag
      },{new:true})
      res.send(updatenote);
   })
   // ROUTE 4 :delete note :DELETE /notes/:id
   router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
      try {
         let note = await Notes.findById(req.params.id);
      if(!note){
         return res.status(404).send('note not found');
      }
      if(note.user.toString()!==req.user._id.toString()){
         return res.status(401).send('unauthorized');
      }
       const deletednote = await Notes.findByIdAndDelete(req.params.id);
        
      res.json({"success":"Note deleted successfully"});
      } catch (error) {
         console.log(error);
         res.status(500).send('server error');

      }
   })
module.exports = router;