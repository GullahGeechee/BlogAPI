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
       
    
    },
    age: {
        type: Number,
   
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