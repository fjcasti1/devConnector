const auth = (req, res, next) => {
  // Check if there is no user attached to the req object
  // which would happen if the user is not logged in
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: 'Not logged in, authorization denied' });
  }
  next();
};

export default auth;
