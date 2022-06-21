
const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const helmet = require('helmet')
const mongoConfig = require('./config/mongoConfig')
const blogsRouter = require('./routes/blogsRouter')
const usersRouter = require('./routes/usersRouter')
const authRouter = require('./routes/authRouter')

const app = express()
const PORT = process.env.PORT || 6000


//* middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

//* Routers
app.use('/blogs', blogsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)


app.get('/', (req, res) => {
    res.status(200).json("It burns when IP xD")
})

app.listen(PORT, () => {
    console.log(`All aboard Port API..`);
    mongoConfig()
})