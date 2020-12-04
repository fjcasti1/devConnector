import express from 'express';

const router = express.Router();

// @route     GET api/profle
// @desc      Test Route
// @access    Public
router.get('/', (req, res) => {
  res.send('Profiles Route');
});

export default router;
