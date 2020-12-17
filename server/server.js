import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import 'colors';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import profileRoutes from './routes/profiles.js';
import postsRoutes from './routes/posts.js';
import passport from 'passport';
import cors from 'cors';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import session from 'express-session';
// Passport config
import './config/passportSetup.js';
// Mongo config
import connectDB from './config/db.js';

// Connect session to MongoDB
const MongoStore = connectMongo(session);

// Access to env varaibles
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

// Cors Middleware
app.use(cors());
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postsRoutes);

// Define dirname
const __dirname = path.resolve();

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
      .underline,
  ),
);
