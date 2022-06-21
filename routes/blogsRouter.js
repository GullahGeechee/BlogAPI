const express = require('express')
const authmiddleware = require('../middleware/authmiddleware')
const blogsModel = require('../model/blogSchema')
const router = express.Router()


//* GET BLOGS
router.get('/', authmiddleware, async (req, res) => {
    try {
        const blog = await blogsModel.find()
        res.status(200).json(blog)
    } catch (error) {
        console.log(error)
    }
 })


 //* Create BLOGS 
 router.post('/post', authmiddleware, async (req, res) => {
    const blogData = req.body // gets the data from the request
    console.log(blogData);
    try {
        const blogs = await blogsModel.create(blogData) // create the todo in the db
        // send back the response
        res.status(201).json(blogs)
        // res.status(201).json({data: todo})
    } catch (error) {
        console.error(error)
        res.status(400).json('Bad request!')
    }
})

//* -- by ID
router.get('/:id', authmiddleware, async (req, res) => {
    const id = req.params.id

    try {
        const blogs = await blogsModel.findById(id)
        res.status(200).json(blogs)
    } catch (error) {
        console.error(error)
        res.status(400).json({
            msg: 'Id not found'
        })
    }
})


//* -- UPDATE BLOG POST BY ID
router.put('/:id', authmiddleware, async (req, res) => {
    const id = req.params.id
    const newBlog = req.body
     try {
         //* find the todo by the id
         const blog = await blogsModel.findByIdAndUpdate(id, newBlog, {new: true})
         res.status(202).json(blog)
     } catch (error) {
         console.log(error)
     }
})

//*-- DELETE A BLOG POST
router.delete('/:id', authmiddleware, async (req, res) => {
    const post = req.params.id

    try {
        const blog = await blogModel.findByIdAndDelete(id)
        res.status(200).json({msg: 'Post was deleted!'})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router