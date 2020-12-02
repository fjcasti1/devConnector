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
        const newUser = {
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        };

        try {
          let user = await UserGoogle.findOne({ googleId: profile.id });
          console.log(user);
          if (!user) {
            user = await UserGoogle.create(newUser);
          }
          console.log(user);
          cb(null, user);
        } catch (error) {
          console.error(error);
        }

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
