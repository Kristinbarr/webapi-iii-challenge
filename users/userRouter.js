const express = require('express')
const userDb = require('../users/userDb')

const router = express.Router()

router.use(':/id', validateUserId)

// POST -
router.post('/', (req, res) => {})

// POST - add a new user
router.post('/:id/posts', validateUser, (req, res) => {})

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

// GET - return post by id
router.get('/:id', async (req, res) => {
  try {
    const user = await userDb.getById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    // log error to server
    console.log(error)
    res.status(500).json({ message: 'User not found' })
  }
})

// GET - return posts for a user by id
router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await userDb.getUserPosts(req.params.id)
    res.status(200).json(posts)
  } catch (error) {
    // log error to server
    console.log(error)
    res.status(500).json({ message: 'Posts not found' })
  }
})

// DELETE
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

// PUT
router.put('/:id', validateUser, (req, res) => {

})

//custom middleware
function validateUserId(req, res, next) {
  if (req.params.id) {
    req.user = req.user
    next()
  } else {
    res.status(400).json({message: "invalid user id"})
  }
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing user data' })
  } else if (!req.name) {
    res.status(400).json({ message: 'missing required name field' })
  } else {
    next()
  }
}

function validatePost(req, res, next) {

}

module.exports = router
