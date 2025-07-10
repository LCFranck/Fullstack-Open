const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const config = require('./utils/config')

const app = express()

//observera ordningen på två nästa kodrader!!
app.use(express.json())

//const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
//const middleware = require('./utils/middleware')



//const mongoUrl = 'mongodb://localhost/bloglist'

mongoose.connect( config.MONGODB_URI)

app.use('/api/blogs', blogsRouter)

module.exports = app
