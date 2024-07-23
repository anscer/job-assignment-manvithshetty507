// src/routes/stateRouter.ts
import { Router } from 'express';
import { createState, getState, updateState, deleteState } from '../controllers/stateController';

const router = Router();

// Middleware to ensure the user is authenticated
const ensureAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

router.post('/states', ensureAuthenticated, createState);
router.get('/states/:id', getState);
router.put('/states/:id', ensureAuthenticated, updateState);
router.delete('/states/:id', ensureAuthenticated, deleteState);

export default router;
