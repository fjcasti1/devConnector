import express from 'express';
import passport from 'passport';

const router = express.Router();

// @route     GET auth/google
// @desc      Authenticate with Google
// @access    Public
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// @route     GET auth/google/callback
// @desc      Google auth callback
// @access    Public
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/register');
  },
);

// @route     GET auth/github
// @desc      Authenticate with GitHub
// @access    Public
router.get(
  '/github',
  passport.authenticate('github', { scope: ['profile', 'email'] }),
);

// @route     GET auth/github/callback
// @desc      GitHub auth callback
// @access    Public
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/register');
  },
);

export default router;
