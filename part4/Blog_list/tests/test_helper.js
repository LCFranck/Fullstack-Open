const Blog = require('../models/blog')


const initialUser = [

{
    username: "tehe",
    name: "caca",
    password: "tehe"
}
]

const logIn = [
  {
  username: "tehe",
  password: "tehe"
  }

]

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

const getTokenForTestUser = async (api) => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(initialUser.password, 10)
  const user = new User({
    username: initialUser.username,
    name: initialUser.name,
    passwordHash
  })
  await user.save()

  // Now log in via the API to get token
  const response = await api
    .post('/api/login')
    .send({
      username: initialUser.username,
      password: initialUser.password
    })

  return {
    token: response.body.token,
    userId: user._id.toString()
  }
}

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
  initialUser,
  nonExistingId,
  blogsInDb,
  getTokenForTestUser,
}