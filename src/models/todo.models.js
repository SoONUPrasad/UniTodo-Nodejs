const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
      type: String,
      enum: ['Personal', 'Work', 'Home'],  
      default: 'Personal'
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{ timestamps: true });

module.exports = mongoose.model('Todo', todoSchema)