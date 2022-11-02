const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    text: {
        type: String
    },
    description:{
type:String
    },dateCreated: {
        type: String
    },
     completed: {
        type: Boolean
    }, userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const TodoModel = mongoose.model('Todo', todoSchema)

module.exports = TodoModel