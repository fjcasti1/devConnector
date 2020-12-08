import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import morgan from 'morgan';
import authRoutes from './routes/api2/auth.js';
import usersRoutes from './routes/api2/users.js';
import profileRoutes from './routes/api2/profiles.js';
import postsRoutes from './routes/api2/posts.js';
import passport from 'passport';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import session from 'express-session';
// Passport config
import './config/passportSetup.js';

const MongoStore = connectMongo(session);

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
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 3600 * 1 },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/profiles', profileRoutes);
app.use('/posts', postsRoutes);

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
