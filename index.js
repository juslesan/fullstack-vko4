const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const url = 'mongodb://fullstack:sekret@ds229388.mlab.com:29388/fullstack-vko3'

mongoose.connect(url)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(middleware.logger)
app.use('/api/blogs', blogsRouter)


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})