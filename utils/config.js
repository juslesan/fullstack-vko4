if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  let port = '3003'
  let mongoUrl = 'mongodb://fullstack:sekret@ds229388.mlab.com:29388/fullstack-vko3'
  
  if (process.env.NODE_ENV === 'test') {
    port = '3004'
    mongoUrl = 'mongodb://fullstack:sekret@ds237848.mlab.com:37848/vko4-test'
  }
  
  module.exports = {
    mongoUrl,
    port
  }