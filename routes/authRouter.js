const express = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const UserModel = require('../model/usersSchema')
const jwt = require('jsonwebtoken')
const router = express.Router()

//* --- User Login
router.post('/',[
    check("email", "Provide a valid email").isEmail(),
    check("password", "Check your password!").notEmpty()
] , async (req, res) => {
    const userData = req.body

    const errors = validationResult(req)
    // Checks for validation errors
    if (!errors.isEmpty()){
        return res.json(errors.array())
    }

    try {
        // Find the user with the provided email
        const user = await UserModel.findOne({email: userData.email})

        if (!user){
            return res.json('User not found!')
        }

        // Compare the plain text password to hashed password
        const isMatch = await bcrypt.compare(userData.password, user.password)

        if (!isMatch){
            return res.json('Password is not a match!')
        }
         //* ==========
         //res.status(200).json('Success!')

          //* create a new JWT Token
        const payload = {
            id: user._id,
            email: user.email
        }

        const SECRET_KEY='MY_SECRET_KEY'

        const TOKEN = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2 Days"})

        res.status(201).json({
            user: user,
            token: TOKEN
        })
       

    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error')
    }



})





module.exports = router
