const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.get('/', async (request, response) => {
  const notes = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.user)
  if (!user) {   
     return response.status(400).json({ error: 'userId missing or not valid' })  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })


  user.blogs = user.blogs.concat(savedBlog._id)  
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
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


/* blogsRouter.post('/', (request, response) => {
  console.log('Request body:', request.body)

  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
}) */

module.exports = blogsRouter
