const express = require('express')
const userDb = require('../users/userDb')

const router = express.Router()

router.use(':/id', validateUserId)

// POST - add a new user
router.post('/', validateUser, async (req, res) => {
  // validateUser middleware checks if body is valid and has name property
  try {
    const user = req.body
    const newUser = await userDb.insert(user)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({message: "Error adding user"})
  }
})

// POST - add a new posts to a user
router.post('/:id/posts', validateUser, async (req, res) => {
  // validateUser middleware checks if body is valid and has name property
  try {
    const
  } catch (error) {

  }
})

// GET - all posts
router.get('/', async (req, res) => {
  try {
    const users = await userDb.get()
    res.status(200).json(users)
  } catch (error) {
    // log error to server
    console.log(error)
    res.status(500).json({
      message: 'Error retrieving the posts'
    })
  }
})

// GET - return user by id
router.get('/:id', (req, res) => {
  // req.user is added by validationUserId middleware
  if (req.user) {
    res.status(200).json(req.user)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
})

// GET - return posts from a users by id
router.get('/:id/posts', (req, res) => {
  if (req.user) {
    res.status(200).json(req.user)
  } else {
    // log error to server
    console.log(error)
    res.status(500).json({ message: 'Users not found' })
  }
})

// DELETE - delete a user by id
router.delete('/:id', async (req, res) => {
  try {
    await userDb.remove(req.params.id)
    res.status(204)
  } catch (error) {
    // log error to server
    console.log(error)
    res.status(500).json({ message: 'Problem deletin user' })
  }
})

// PUT - update a user by id
router.put('/:id', validateUser, (req, res) => {})

//custom middleware
// validates user id on every request that expects a user id parameter
async function validateUserId(req, res, next) {
  try {
    const user = await userDb.getById(req.params.id)
    if (user) {
      req.user = user
      next()
    } else {
      res.status(400).json({ message: 'invalid user id' })
    }
  } catch (error) {
    res.status(500).json({
      error: 'There was an error while validating id'
    })
  }
}

// validates the body on a request to create a new user
function validateUser(req, res, next) {
  if (JSON.stringify(req.body) === "{}") { // check if body has data
    res.status(400).json({ message: 'missing user data' })
  } else if (!req.body.name) { // checks if name in body exists
    res.status(400).json({ message: 'missing required name field' })
  } else {
    next()
  }
}

// validates the body on a request to create a new post
function validatePost(req, res, next) {
  if (JSON.stringify(req.body) === "{}") { // check if body has data
    res.status(400).json({ message: 'missing post data' })
  } else if (!req.body.text) { // checks if text in post exists
    res.status(400).json({ message: 'missing required text field' })
  } else {
    next()
  }
}

module.exports = router
