const express = require('express')
const userRouter = require('./users/userRouter')

const helmet = require('helmet')

const server = express()

// global middleware
server.use(express.json())
server.use('/api/users', logger, userRouter)

// custom logger middleware
function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} at ${new Date().toISOString()}`)
  next()
}

module.exports = server
