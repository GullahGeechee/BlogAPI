//* --Call Everything
const express = require('express')
const UserModel = require('../model/usersSchema')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

// * -- NOT WORKING ASK WHY TUESDAY POSTMAN NOT Working 
router.get('/', async (req, res) => {
    //const use = req.params.id
 try {
      const user = await UserModel.find()
      res.status(200).json(user)  
    } catch (error) {
        console.error(error);
    }
})


//* --Create User


router.post('/new', [
    check('username', "Username is required from Middleware!").notEmpty(),
    check("email", "Please use a valid email! from middleware").isEmail(),
    check("password", "Please enter a password").notEmpty(),
    check("password", "Please enter a password with six or more characters").isLength({min: 6}),
] ,async (req, res) => {
    const userData = req.body

    const errors = validationResult(req)
    // Checks for validation errors
    if (!errors.isEmpty()){
        return res.json(errors.array())
    }

    try {
        // checking if there is an user with this email in the db
        const userExist = await UserModel.findOne({email: userData.email})
        // if user exist we return!
        if (userExist) {
            return res.json({msg: "User already exist!"})
        }



        //* -- New User
        // 1 Create the salt
        const SALT = await bcrypt.genSalt(10)
        // 2 use the salt to create a hash with the user's password
        const hashedPassword = await bcrypt.hash(userData.password, SALT)
        // 3 assign the hashed password to the userData
        userData.password = hashedPassword
        // Write the user to the db
        const user = await UserModel.create(userData)

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
        console.log(error)
        res.status(400).json('Bad request! BAD!')
    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await UserModel.findById(id)
        res.status(200).json(user)
    }
    catch (error) {
        console.log(error)
    }
})
//*---UPDATE USER
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const newUsersData = req.body
    try {
        //find user by id
        await UserModel.findByIdAndUpdate(id, newUsersData, { new: true })
        res.status(200).json({ msg: 'user was updated' })
    }
    catch (error) {
        console.log(error)
    }
})
//*---DELETE A USER
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        //find user by id and DELETE!
        await UserModel.findByIdAndDelete(id)
        res.status(200).json({ msg: 'user was deleted' })
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router