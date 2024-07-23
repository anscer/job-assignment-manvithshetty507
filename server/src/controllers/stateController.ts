import { Request, Response } from 'express';
import State from '../models/state';  // Ensure this is the correct path

// Create a new state
const createState = async (req: Request, res: Response): Promise<void> => {
  try {
    const state = new State(req.body);
    await state.save();
    res.status(201).json(state);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get a state by ID
const getState = async (req: Request, res: Response): Promise<void> => {
  try {
    const state = await State.findById(req.params.id);
    if (!state) {
      res.status(404).json({ error: 'State not found' });
      return;
    }
    res.json(state);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

// Update a state by ID
const updateState = async (req: Request, res: Response): Promise<void> => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!state) {
      res.status(404).json({ error: 'State not found' });
      return;
    }
    res.json(state);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

// Delete a state by ID
const deleteState = async (req: Request, res: Response): Promise<void> => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) {
      res.status(404).json({ error: 'State not found' });
      return;
    }
    res.json({ message: 'State deleted' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export { createState, getState, updateState, deleteState };
