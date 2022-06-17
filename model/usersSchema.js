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
        type: Date,
        required: true,
    
    },
    age: {
        type: Number,
        required: true,
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

module.exports = mongoose.model('user', usersSchema)