import express from 'express';
import passport from 'passport';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';

const router = express.Router();

// TODO: Protect callbacks?
// TODO: Set callbacks to the correct URL & page

dotenv.config();

// @route     GET api/auth/user
// @desc      Get authenticated user
// @access    Private
router.get('/user', auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/auth/google
// @desc      Authenticate with Google
// @access    Public
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// @route     GET api/auth/google/callback
// @desc      Google auth callback
// @access    Public
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`${process.env.REDIRECT_URL}/dashboard`);
  },
);

// @route     GET api/auth/github
// @desc      Authenticate with GitHub
// @access    Public
router.get(
  '/github',
  passport.authenticate('github', { scope: ['profile', 'email'] }),
);

// @route     GET api/auth/github/callback
// @desc      GitHub auth callback
// @access    Public
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`${process.env.REDIRECT_URL}/dashboard`);
  },
);

// @route     GET api/auth/logout
// @desc      Logout
// @access    Private
router.get('/logout', auth, (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res
      .clearCookie('connect.sid', { path: '/' })
      .json({ msg: 'You are logged out!' });
  });
});

export default router;
