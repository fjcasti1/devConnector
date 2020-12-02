const GoogleStrategy = require('passport-google-oauth20');
const UserGoogle = require('../models/UserGoogle');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
      },
    ),
  );

  passport.serializeUser((userGoogle, done) => {
    done(null, userGoogle.id);
  });

  passport.deserializeUser((id, done) => {
    UserGoogle.findById(id, (err, userGoogle) => done(err, userGoogle));
  });
};
