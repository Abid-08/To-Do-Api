const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: Number
    }, email: {
        type: String
    },FirstName: {
        type: String
    },LastName : {
        type: String
    },
     password: {
        type: String
    }, token: {
        type: String
    }, Todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Todo'
        }
    ], userImage: {
        type: String
    }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel