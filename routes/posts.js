import express from 'express';
import auth from '../middleware/auth2.js';
import User from '../models/User.js';
import Post from '../models/Post.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// @route     POST posts/
// @desc      Create a post
// @access    Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        user: req.user.id,
        name: user.name,
        image: user.image,
        text: req.body.text,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     GET posts/
// @desc      Get all posts
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET posts/:postId
// @desc      Get post by ID
// @access    Private
router.get('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     DELETE posts/:postId
// @desc      Delete post by ID
// @access    Private
router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check user is creator of post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    // Remove post
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     PUT posts/:postId/like
// @desc      Like a post
// @access    Private
router.put('/:postId/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check if the post has already been liked by user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
    ) {
      // Post already liked by user
      return res.status(400).json({ msg: 'Post already liked' });
    }
    // Add like
    post.likes.unshift({ user: req.user.id });

    // Save post
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     PUT posts/:postId/unlike
// @desc      Unlike a post
// @access    Private
router.put('/:postId/unlike', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check if the post has NOT been liked by user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length === 0
    ) {
      // Post not yet been liked by user
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }
    // Unlike
    // - Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    // - Remove like from array
    post.likes.splice(removeIndex, 1);

    // Save post
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     POST posts/:postId/comment
// @desc      Comment on a post with its id
// @access    Private
router.post(
  '/:postId/comment',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.postId);

      const newComment = {
        user: req.user.id,
        name: user.name,
        image: user.image,
        text: req.body.text,
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     DELETE posts/:postId/comment/:commentId
// @desc      Delete a comment in a post
// @access    Private
router.delete('/:postId/comment/:commentId', auth, async (req, res) => {
  try {
    // Obtain post
    const post = await Post.findById(req.params.postId);

    // Obtain comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentId,
    );

    // Check that comment exists
    if (!comment) {
      return res.status(404).send({ msg: 'Comment does not exist' });
    }

    // Check the comment is erased by the user who posted it
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Erase the comment
    // - Find index in array
    const removeIndex = post.comments.indexOf(comment);
    // - Splice
    post.comments.splice(removeIndex, 1);

    // Save
    await post.save();

    // Send response
    res.send(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
