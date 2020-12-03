import mongoose from 'mongoose';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';
import GitHubStrategy from 'passport-github2';
import User2 from '../models/User2.js';

dotenv.config();

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, cb) => {
    const newUser = {
      userId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      image: profile.photos[0].value,
    };

    try {
      let user = await User2.findOne({ userId: profile.id });
      if (!user) {
        user = await User2.create(newUser);
      }
      cb(null, user);
    } catch (error) {
      console.error(error);
    }
  },
);

const githubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
  },
  async (accessToken, refreshToken, profile, cb) => {
    const newUser = {
      userId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      image: profile.photos[0].value,
    };

    try {
      let user = await User2.findOne({ userId: profile.id });
      if (!user) {
        user = await User2.create(newUser);
      }
      cb(null, user);
    } catch (error) {
      console.error(error);
    }
  },
);

export { googleStrategy, githubStrategy };

// module.exports = function (passport) {
//   passport.use(
//     new GitHubStrategy(
//       {
//       },
//       async (accessToken, refreshToken, profile, cb) => {
//         // const newUser = {
//         //   userId: profile.id,
//         //   firstName: profile.name.givenName,
//         //   lastName: profile.name.familyName,
//         //   email: profile.emails[0].value,
//         //   image: profile.photos[0].value,
//         // };

//         // try {
//         //   let user = await User2.findOne({ userId: profile.id });
//         //   console.log(user);
//         //   if (!user) {
//         //     user = await User2.create(newUser);
//         //   }
//         //   console.log(user);
//         //   cb(null, user);
//         // } catch (error) {
//         //   console.error(error);
//         // }

//         console.log(profile);
//       },
//     ),
//   );
// };
