const { test, describe, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const config = require('../utils/config')

const api = supertest(app)

describe('Blog API', () => {
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

  after(async () => {
    await mongoose.connection.close()
  })
})