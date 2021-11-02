const mongoose = require('mongoose');
const { Schema } = require("mongoose");
const NotesSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    title: {
        type: String,
    },
    description: {
        type: String,
    },
    tag:{
        type: String,
        default: 'general'
    },
    date: {
        type: Date,
        default: Date.now,
    }
    });

    module.exports = mongoose.model('Notes', NotesSchema);