import express from 'express';
import passport from 'passport';
import { v4 as uuidv4 } from 'uuid';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';
import User from '../models/User.js';

const router = express.Router();

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
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

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
router.get('/github', passport.authenticate('github', { scope: ['profile', 'email'] }));

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

// @route     GET api/auth/facebook
// @desc      Authenticate with Facebook
// @access    Public
router.get('/facebook', passport.authenticate('facebook'));

// @route     GET api/auth/facebook/callback
// @desc      Facebook auth callback
// @access    Public
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`${process.env.REDIRECT_URL}/dashboard`);
  },
);

// @route     GET api/auth/login
// @desc      Login an user
// @access    Public
router.post('/login', (req, res, next) => {
  // console.log('Route login before Local Strategy'.cyan.bold);
  passport.authenticate('local', (err, user, info) => {
    // console.log('PS callback'.cyan);
    // console.log(err);
    // console.log(user);
    // console.log(info);
    if (!user) {
      // console.log('No user res'.red);
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (error) => {
      if (error) {
        // console.log('login error'.red, error);
        return next(err);
      }
      // res.redirect('/login');
      res.json(user);
    });
  })(req, res, next);
});

// --------------------------------------------------------------------------------------------------------------------

// @route     GET api/auth/logout
// @desc      Logout
// @access    Private
router.get('/logout', auth, (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.clearCookie('connect.sid', { path: '/' }).json({ msg: 'You are logged out!' });
  });
});

// @route     GET api/auth/register
// @desc      Register an user
// @access    Public
router.post(
  '/register',
  async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      // Get user gravatar
      const image = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      const providerUserId = uuidv4();

      // Create new user
      user = new User({
        providerUserId,
        provider: 'local',
        name,
        email,
        image,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user to DB
      await user.save();

      next();
    } catch (error) {
      console.error(error);
    }
  },
  // Login after registering user
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    res.send(req.user);
  },
);

export default router;
