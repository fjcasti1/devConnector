const express = require('express');
const passport = require('passport');
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

module.exports = router;
