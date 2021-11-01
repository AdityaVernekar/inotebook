const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
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