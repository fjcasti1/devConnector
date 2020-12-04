import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import morgan from 'morgan';
import passport from 'passport';
import cookieSession from 'cookie-session';
import authRoutes from './routes/api2/auth.js';
import usersRoutes from './routes/api2/users.js';
import profileRoutes from './routes/api2/profile.js';
import postsRoutes from './routes/api2/posts.js';
import thirdPartyAuthRoutes from './routes/thirdPartyAuth.js';
// Passport config
import './config/passportSetup.js';

dotenv.config();

// Initialize express server
const app = express();

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
  cookieSession({
    keys: process.env.COOKIE_KEY,
    maxAge: 1000 * 60, // TODO: extend time!!
  }),
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/profiles', profileRoutes);
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
