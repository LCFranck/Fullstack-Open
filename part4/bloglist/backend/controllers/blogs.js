const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})



blogsRouter.delete('/:id',userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = await jwt.verify(request.token, process.env.SECRET)  
  const user = request.user

  console.log("blog user:" + blog.user.toString())
  console.log("user user:" + user._id.toString())

  if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

  if ( blog.user.toString() !== user._id.toString()){
       return response.status(400).json({ error: 'Invalid user!' })
  }
  else {
 
  }
  await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})






blogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body

  Blog.findById(request.params.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).end()
      }
      blog.title = title,
      blog.author = author,
      blog.url = url,
      blog.likes = likes

      return blog.save().then((updatedBlog) => {
        response.json(updatedBlog)
      })
    })
    .catch((error) => next(error))
})


module.exports = blogsRouter
