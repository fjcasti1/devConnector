import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import Post from '../models/Post.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

const getCurrentUserLikeAndDislike = (post, userID) => {
  // Get current user's like, if any
  const currentUserLike = post.likes.filter(
    (like) => like.user.toString() === userID,
  );
  // Get current user's dislike, if any
  const currentUserDislike = post.dislikes.filter(
    (dislike) => dislike.user.toString() === userID,
  );

  return { currentUserLike, currentUserDislike };
};

const removeFromArray = (array, userID) => {
  // Get remove index
  const removeIndex = array.map((item) => item.user.toString()).indexOf(userID);
  // Remove item from array
  array.splice(removeIndex, 1);
};

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

    const { currentUserLike, currentUserDislike } = getCurrentUserLikeAndDislike(
      post,
      req.user.id,
    );

    // Remove dislike if user previously disliked the post
    if (currentUserDislike.length > 0) {
      removeFromArray(post.dislikes, req.user.id);
    }

    // Toggle like
    if (currentUserLike.length == 0) {
      // - Add like if post not yet liked
      post.likes.unshift({ user: req.user.id });
    } else if (currentUserLike.length > 0) {
      // - Remove like if post already liked
      removeFromArray(post.likes, req.user.id);
    }

    // Save post
    await post.save();

    res.json({ likes: post.likes, dislikes: post.dislikes });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     PUT posts/:postId/dislike
// @desc      Dislike a post
// @access    Private
router.put('/:postId/dislike', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const { currentUserLike, currentUserDislike } = getCurrentUserLikeAndDislike(
      post,
      req.user.id,
    );

    // Remove like if user previously liked the post
    if (currentUserLike.length > 0) {
      removeFromArray(post.likes, req.user.id);
    }

    // Toggle dislike
    if (currentUserDislike.length == 0) {
      // - Add dislike if post not yet disliked
      post.dislikes.unshift({ user: req.user.id });
    } else if (currentUserDislike.length > 0) {
      // - Remove dislike if post already disliked
      removeFromArray(post.dislikes, req.user.id);
    }

    // Save post
    await post.save();

    res.json({ likes: post.likes, dislikes: post.dislikes });
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
