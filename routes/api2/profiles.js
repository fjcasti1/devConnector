import express from 'express';
import auth from '../../middleware/auth2.js';
import Profile from '../../models/Profile.js';
import { check, validationResult } from 'express-validator';
import request from 'request';

// TODO: Update experience & education

const router = express.Router();

// @route     GET profiles/me
// @desc      Get current user profile
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'image',
    ]);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST profiles/
// @desc      Create or update a user profile
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      Array.isArray(skills)
        ? skills
        : (profileFields.skills = skills.split(',').map((skill) => skill.trim()));
    }

    // Build social object inside the profile object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    // Update & Insert data
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
        );
        return res.json(profile);
      }

      // Create, save & return profile
      profile = new Profile(profileFields);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     GET profiles/
// @desc      Get all profiles
// @access    Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'image']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET profiles/:userId
// @desc      Get profile by user ID
// @access    Public
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate('user', ['name', 'image']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     POST profiles/me/experience
// @desc      Add profile experience
// @access    Private
router.post(
  '/me/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'Start date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } = req.body;
    const newExp = { title, company, location, from, to, current, description };

    try {
      // Fetch profile by user ID
      const profile = await Profile.findOne({ user: req.user.id });
      // Add new experience in the front
      profile.experience.unshift(newExp); // unshift is similar to push
      // Save profile
      await profile.save();
      // Send back profile
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     DELETE profiles/me/experience/:expId
// @desc      Delete experience from profile
// @access    Private
router.delete('/me/experience/:expId', auth, async (req, res) => {
  try {
    // Get profile profile
    const profile = await Profile.findOne({ user: req.user.id });
    // Get the remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.expId);

    if (removeIndex === -1)
      return res.status(400).json({ msg: 'Experience item not found' });
    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST profiles/me/education
// @desc      Add profile education
// @access    Private
router.post(
  '/me/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'Start date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = { school, degree, fieldofstudy, from, to, current, description };

    try {
      // Fetch profile by user ID
      const profile = await Profile.findOne({ user: req.user.id });
      // Add new experience in the front
      profile.education.unshift(newEdu); // unshift is similar to push
      // Save profile
      await profile.save();
      // Send back profile
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     DELETE profiles/me/education/:eduId
// @desc      Delete education from profile
// @access    Private
router.delete('/me/education/:eduId', auth, async (req, res) => {
  try {
    // Get profile profile
    const profile = await Profile.findOne({ user: req.user.id });
    // Get the remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.eduId);

    if (removeIndex === -1)
      return res.status(400).json({ msg: 'Education item not found' });
    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET profiles/github/:username
// @desc      Get user repos from Github
// @access    Public
router.get('/github/:username', async (req, res) => {
  const githubClientId = process.env.GITHUB_CLIENT_ID;
  const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
