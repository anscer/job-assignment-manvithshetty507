// src/config/passport.ts
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';

export const initializePassport = (passport: any) => {
  passport.use(new LocalStrategy(async (username: string, password: string, done: any) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'No user with that username' });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return done(null, false, { message: 'Password incorrect' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: any) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
