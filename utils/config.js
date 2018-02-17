if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  let port = '3003'
  let mongoUrl = process.env.MONGODB_URI
  
  if (process.env.NODE_ENV === 'test') {
    port = '3004'
    mongoUrl = process.env.MONGODB_TEST_URI
  }
  
  module.exports = {
    mongoUrl,
    port
  }