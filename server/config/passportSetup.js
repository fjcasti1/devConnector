import passport from 'passport';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';
import GitHubStrategy from 'passport-github2';
import User from '../models/User.js';

dotenv.config();

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        provider: profile.provider,
        providerUserId: profile.id,
        name: profile.displayName,
        image: profile.photos[0].value,
      };
      if (profile.emails !== null) {
        newUser.email = profile.emails[0].value;
      }

      try {
        let user = await User.findOne({ email: newUser.email });
        if (!user) {
          user = await User.create(newUser);
        }
        done(null, user);
      } catch (error) {
        console.error(error);
      }
    },
  ),
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        provider: profile.provider,
        providerUserId: profile.id,
        name: profile.displayName,
        image: profile.photos[0].value,
      };
      if (profile.emails) newUser.email = profile.emails[0].value;

      try {
        let user = await User.findOne({ email: newUser.email });
        if (!user) {
          user = await User.create(newUser);
        }
        done(null, user);
      } catch (error) {
        console.error(error);
      }
    },
  ),
);

// Serializer & Deserializer to allow sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await User.findById(id, (err, user) => done(err, user));
});
