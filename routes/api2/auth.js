import express from 'express';
import passport from 'passport';
import auth from '../../middleware/auth2.js';

const router = express.Router();

const REDIRECT = 'https://app-dev-general.herokuapp.com';

// @route     GET auth/user
// @desc      Get authenticated user
// @access    Public
router.get('/user', auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

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
    res.redirect(REDIRECT);
    // res.send('caca');
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
    res.redirect(REDIRECT);
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ msg: 'You are logged out!' });
});

export default router;
