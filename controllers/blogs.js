const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    }
  }

  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})  
    response.json((blogs.map(formatBlog)))

  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = new Blog(request.body)
  
    if (body.title === undefined) {
      return response.status(400).json({ error: 'title missing' })
    }
    if (body.url === undefined) {
      return response.status(400).json({ error: 'url missing' })
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
    })
    const savedBlog = await blog.save()
    response.json(formatBlog(blog))
  })

  blogsRouter.delete('/:id', async (request, response) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
  
      response.status(204).end()
    } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'malformatted id' })
    }
  })

  blogsRouter.put('/:id', (request, response) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes:  body.likes,
    }
  
    Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(formatBlog(updatedBlog))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })

  module.exports = blogsRouter
