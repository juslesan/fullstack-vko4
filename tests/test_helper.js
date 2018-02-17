const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    { 
      title: "Arton seikkailut",
      author: "Matti",
      url: "jotaijotai.com",
      likes: 3 
    }
  ]

const format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users
  }
module.exports = {
  initialBlogs, format, nonExistingId, blogsInDb, usersInDb
}