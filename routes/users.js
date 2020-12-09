import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Post from '../models/Post.js';

const router = express.Router();

// @route     DELETE users/me
// @desc      Delete posts, profile & user
// @access    Private
router.delete('/me', auth, async (req, res) => {
  try {
    // Remove posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
