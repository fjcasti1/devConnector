import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import GoogleStrategy from 'passport-google-oauth20';
import GitHubStrategy from 'passport-github2';
import FacebookStrategy from 'passport-facebook';
import LocalStrategy from 'passport-local';
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
        done(error, null);
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
        done(error, null);
      }
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/api/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'picture.type(large)', 'email'],
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
        done(error, null);
      }
    },
  ),
);

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    console.log('Local Strategy'.cyan.bold);
    try {
      // Check if user exists
      const user = await User.findOne({ email: email });
      if (!user) {
        console.log('No user'.red);
        return done(null, false, { message: 'Invalid Credentials' });
      }

      // Check if password is correct
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        console.log('Incorrect Password'.red);
        return done(null, false, { message: 'Invalid Credentials' });
      }

      const sendUser = await User.findOne({ email: email }).select('-password');

      console.log('All good'.green);
      done(null, sendUser);
    } catch (error) {
      return done(error);
    }
  }),
);

// Serializer & Deserializer to allow sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
