const { test, describe, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer
let mongoose
let api
let Blog
let User

before(async () => {
  mongoServer = await MongoMemoryServer.create()
  process.env.NODE_ENV = 'test'
  process.env.TEST_MONGODB_URI = mongoServer.getUri('blogAppTest')
  process.env.SECRET = process.env.SECRET || 'test_secret'

  const app = require('../app')
  mongoose = require('mongoose')
  Blog = require('../models/blog')
  User = require('../models/user')
  api = supertest(app)
})

const loginAndGetToken = async (username, password) => {
  const response = await api
    .post('/api/login')
    .send({ username, password })
    .expect(200)

  return response.body.token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({
    username: 'root',
    name: 'Superuser',
    passwordHash
  })
  const savedUser = await user.save()

  const initialBlogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: savedUser._id
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Statement_Considered_Harmful.html',
      likes: 5,
      user: savedUser._id
    }
  ]

  const insertedBlogs = await Blog.insertMany(initialBlogs)
  savedUser.blogs = insertedBlogs.map(blog => blog._id)
  await savedUser.save()
})

describe('blog API', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs have id field', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => assert.ok(blog.id))
  })

  test('a valid blog can be added with a token', async () => {
    const token = await loginAndGetToken('root', 'sekret')
    const blogsAtStart = await api.get('/api/blogs')

    const newBlog = {
      title: 'TypeScript in production',
      author: 'Someone',
      url: 'https://example.com/typescript',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1)
  })

  test('adding a blog fails with 401 if token is missing', async () => {
    const newBlog = {
      title: 'Unauthorized blog',
      author: 'Nobody',
      url: 'https://example.com/no-token'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('likes default to 0 if not provided', async () => {
    const token = await loginAndGetToken('root', 'sekret')

    const newBlog = {
      title: 'Blog without likes',
      author: 'John Doe',
      url: 'https://newblog.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(blog => blog.title === newBlog.title)
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('blog without title is not added', async () => {
    const token = await loginAndGetToken('root', 'sekret')

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ author: 'John Doe', url: 'https://newblog.com' })
      .expect(400)
  })

  test('a blog can be deleted by its creator', async () => {
    const token = await loginAndGetToken('root', 'sekret')
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]
    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await api.get('/api/blogs')
    const updatedBlogFromResponse = blogsAtEnd.body.find(blog => blog.id === blogToUpdate.id)
    assert.strictEqual(updatedBlogFromResponse.likes, updatedBlog.likes)
  })
})

describe('user API', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a valid user can be created', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sekret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })

  test('creation fails if username is already taken', async () => {
    const duplicateUser = {
      username: 'root',
      name: 'Another user',
      password: 'another-secret'
    }

    const result = await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)

    assert(result.body.error.includes('expected `username` to be unique'))
  })

  test('creation fails if password is too short', async () => {
    const result = await api
      .post('/api/users')
      .send({ username: 'shortpwd', name: 'Short Password', password: '12' })
      .expect(400)

    assert(result.body.error.includes('password must be at least 3 characters long'))
  })

  test('creation fails if username is too short', async () => {
    const result = await api
      .post('/api/users')
      .send({ username: 'ab', name: 'Too Short', password: 'validpassword' })
      .expect(400)

    assert(result.body.error.includes('username must be at least 3 characters long'))
  })
})

after(async () => {
  await mongoose.connection.close()
  await mongoServer.stop()
})