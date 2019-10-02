const express = require('express')
const userDb = require('../users/userDb')

const router = express.Router()

router.use(':/id', validateUserId)

// POST -
router.post('/', (req, res) => {})

// POST - add a new post
router.post('/:id/posts', (req, res) => {})

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

router.delete('/:id', (req, res) => {})

router.put('/:id', (req, res) => {})

//custom middleware
function validateUserId(req, res, next) {
  if (req.params.id) {
    req.user = req.user
  } else {
    next(res.status(400).json({message: "invalid user id"}))
  }
}

function validateUser(req, res, next) {

}

function validatePost(req, res, next) {}

module.exports = router
