const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  })

  blogSchema.statics.format = (blog) => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  
    }
  }
  
  const Blog = mongoose.model('Blog', blogSchema)
  
  module.exports = Blog