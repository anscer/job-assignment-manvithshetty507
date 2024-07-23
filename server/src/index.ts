// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import { initializePassport } from './config/passport';
import authRouter from './routes/authRouter';
import stateRouter from './routes/stateRouter';

const app = express();
const port = 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
initializePassport(passport);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/robotics')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/auth', authRouter);
app.use('/api', stateRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
