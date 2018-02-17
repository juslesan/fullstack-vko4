
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')


beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('POST /api/notes succeeds with valid data', async () => {
  const blogsAtStart = await blogsInDb()

  const newBlog = { 
    title: "Matin seikkailut",
    author: "Arto",
    url: "jotaijotai.com",
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAfterOperation = await blogsInDb()

  expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

  const titles = blogsAfterOperation.map(r => r.title)
  expect(titles).toContain('Matin seikkailut')
})

test('POST /api/notes succeeds with valid data', async () => {
  const blogsAtStart = await blogsInDb()

  const newBlog = { 
    title: "Matin seikkailut",
    author: "Arto",
    url: "jotaijotai.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAfterOperation = await blogsInDb()

  expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

  const likes = blogsAfterOperation.map(r => r.likes)
  expect(likes).toContain(0)
})

test('POST /api/blogs fails with proper statuscode if title is missing', async () => {
  const newBlog = {
    url: 'url',
    author: 'nimi'
  }

  const blogsAtStart = await blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAfterOperation = await blogsInDb()

  const titles = blogsAfterOperation.map(r => r.titles)

  expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
})

test('POST /api/blogs fails with proper statuscode if url is missing', async () => {
  const newBlog = {
    title: 'titteli',
    author: 'nimi'
  }

  const blogsAtStart = await blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAfterOperation = await blogsInDb()

  const urls = blogsAfterOperation.map(r => r.urls)

  expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
})

afterAll(() => {
  server.close()
})