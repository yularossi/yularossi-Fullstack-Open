const { test, describe, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const config = require('../utils/config')
const api = supertest(app)

beforeEach(async () => {
    // Clear database before each test
    await Blog.deleteMany({})
    
    // Add test data
    const testBlogs = [
      {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Statement_Considered_Harmful.html',
        likes: 5
      }
    ]
    
    await Blog.insertMany(testBlogs)
})

describe('Blog API', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body.length, 2)
  })
})

describe ('id field', () => {
  test('identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    
    //verify that the return is an array
    assert.strictEqual(Array.isArray(response.body), true, 'Response is not an array')
    
    response.body.forEach(blog => {
      assert.ok(blog.id, 'Blog does not have an id field')
    })
  })
})

describe('creating a new blog', () => {
  test('a valid blog can be added', async () => {
    const responseAtStart = await api.get('/api/blogs') // Get the initial number of blogs
    
    const newBlog = {
      title: 'New Blog',
      author: 'John Doe',
      url: 'https://newblog.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const responseAtEnd = await api.get('/api/blogs')
    assert.strictEqual(responseAtEnd.body.length, responseAtStart.body.length + 1, 'Blog count did not increase by 1')
  })
})

describe('likes default to 0', () => {
  test('likes default to 0 if not provided', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'John Doe',
      url: 'https://newblog.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(blog => blog.title === newBlog.title)
    assert.strictEqual(addedBlog.likes, 0, 'Likes do not default to 0')
  })
})

describe('blog without title or url', () => {
  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'John Doe',
      url: 'https://newblog.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'Blog without url',
      author: 'John Doe'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

after(async () => {
    await mongoose.connection.close()
  })