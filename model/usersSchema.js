const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        date: String,
        required: true,
    
    },
    age: {
        type: String,
        number: true,
       // check this 
    },

    password: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', userSchema)