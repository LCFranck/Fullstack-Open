const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'katt',
    author: "kissemisse",
    url: "äxde.ax",
    likes: 4,
  },
    {
    title: 'hund',
    author: "vovve",
    url: "woff.ax",
    likes: 5,
  },
  {
    title: "Goose activities",
    author: "Joe Gas",
    url: "uhhhhhhhhhhh.com",
    likes: 500000000
  
}
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'this will be gone' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}