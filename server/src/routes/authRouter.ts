// src/routes/authRouter.ts
import { Router } from 'express';
import passport from 'passport';
import User from '../models/user';

const router = Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in' });
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Logged out' });
  });
});

export default router;
