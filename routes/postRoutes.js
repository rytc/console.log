const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { redirect } = require('express/lib/response')
const { Post, User, Comment } = require('../models')


// GET all posts
// user must be logged in
router.get('/post', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.find().sort({'createdAt': -1}).populate('user')
  res.json(posts)
})

router.get('/post/topic/:topic', passport.authenticate('jwt'), async (req, res) => {
  Post.find({ topics: req.params.topic }).populate('user').then(posts => {
    res.json(posts)
  }).catch(err => {
    console.log(`!! ERROR: Failed to fetch posts for topic ${req.params.topic}`)
    console.log(err)
    res.status(500).json({ error: `Cannot find posts with topic ${req.params.topic}` })
  })
})

router.get('/post/:id', passport.authenticate('jwt'), async function (req, res) {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user')
      .populate({ path: 'comments', populate: { path: 'user' } })
    res.json(post)
  } catch (err) {
    console.log(`!! ERROR: Failed to fetch post with id ${req.params.id}`)
    console.log(err)
    res.status(500).json({ error: `Failed to fetch post with id ${req.params.id}` })
  }
})

// Get Posts by User ID
router.get('/post/user/:id', passport.authenticate('jwt'), async function (req, res) {
    try {
        const post = await Post.find({ user: req.params.id }).populate('user')
            .populate('user')
            .populate({ path: 'comments', populate: { path: 'user' } });
        res.json(post);
    } catch (err) {
        console.log(`!! ERROR: Failed to fetch post with id ${req.params.id}`);
        console.log(err);
        res.status(500).json({ error: `Failed to fetch post with id ${req.params.id}` })
    }
});

// POST one post
router.post('/post', passport.authenticate('jwt'), function ({ body, user }, res) {
  Post.create({
    content: body.content,
    topics: body.topics,
    user: user.id
  }).then(post => {
    console.log('Post Callback', post)
    User.findByIdAndUpdate(user._id, { $push: { posts: post._id } })
      .then(update => {
        res.json(post)
      })
  })
})

router.post('/post/comment', passport.authenticate('jwt'), (req, res) => {
  Post.findOneAndUpdate(
    {
      _id: req.body.postId
    }, {
      $push: {comments: {
        body: req.body.content,
        post: req.body.postId,
        user: req.user.id
      }
    }
  }).then(comment => {
    res.json(comment);
  }).catch(err => {
    res.status(400).json({error: "Failed to post comment"});
  })
})

// DELETE one post
// user must be logged in
router.delete('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  await Post.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

// Update a post
router.put('/post/:id', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { ...req.body })
    .then(update => {
      res.json(update)
    }).catch(err => {
      console.log(`!! Error updating post with id ${req.params.id}`)
      console.log(err)
      res.status(500).json({ error: 'Failed to update post' })
    })
})

module.exports = router
