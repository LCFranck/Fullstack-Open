const assert = require('node:assert')
const bcrypt = require('bcrypt')

const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)


describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })


  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'betterhund',
      author: "Wolfina Woff",
      url: "woffwoff.fi",
      likes: 10,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map((n) => n.title)
    assert(title.includes('betterhund'))
  })

  test('a new blog with unspecified likes, will have 0 likes ', async () => {
      const newBlog = {
          title: 'unlikedblog',
          author: "Unlikeable person",
          url: "saakeli.fi",
      }
      await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

      const response = await helper.blogsInDb()
    
      const likes = response.map(e => e.likes)
      assert(likes.includes(0))
  })

  test('new blog with unspecified title', async () => {
    const newBlog = {
      author: "mysterious person",
      url: "avasfafw.com",
      likes: 3000,
    }

      await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)


    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('new blog with unspecified url', async () => {
    const newBlog = {
      title: "avasfafw",
      author: "mysterious person",
      likes: 3000,
    }

      await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)


    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })



  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })



  test('_id is id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    assert.ok(blog.id)
  })



  test('a specific blog is within the returned blog', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map(e => e.title)
    assert(title.includes('katt'))
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map((n) => n.titles)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test("a blog's likes can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedLikes = blogToUpdate.likes + 5

    const updatedData = {
      ...blogToUpdate,
      likes: updatedLikes
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlog = response.body
    assert.strictEqual(updatedBlog.likes, updatedLikes)
  })

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert(result.body.error.includes('expected `username` to be unique'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})




after(async () => {
  await mongoose.connection.close()
})