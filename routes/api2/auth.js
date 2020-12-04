import express from 'express';

const router = express.Router();

// @route     GET api/auth
// @desc      Test Route
// @access    Public
router.get('/', (req, res) => {
  res.send('Auth Route');
});

export default router;
