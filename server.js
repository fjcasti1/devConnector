import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/api/auth.js';
import usersRoutes from './routes/api/users.js';
import profileRoutes from './routes/api/profile.js';
import postsRoutes from './routes/api/posts.js';
import thirdPartyAuthRoutes from './routes/thirdPartyAuth.js';
import User2 from './models/User2.js';

dotenv.config();

// Initialize express server
const app = express();

// Passport config
// require('./config/passport')(passport);
import { googleStrategy, githubStrategy } from './config/passportStrategies.js';
passport.use('myGoogleStrategy', googleStrategy);
passport.use('myGitHubStrategy', githubStrategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userId, done) => {
  User2.findById(userId, (err, user) => done(err, user));
});

// Connect to DB
connectDB();

// Logging if in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Init Middleware
app.use(express.json({ extended: false }));

// Sessions Middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }),
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);
app.use('/auth', thirdPartyAuthRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
