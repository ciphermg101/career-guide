import express, { Request, Response } from 'express';
import Career from '../models/Career.js';

const router = express.Router();

// Get all careers
router.get('/', async (req: Request, res: Response) => {
  const careers = await Career.find().populate('category').populate('resources');
  res.json(careers);
});

// Get career by ID
router.get('/:id', async (req: Request, res: Response) => {
  const career = await Career.findById(req.params.id).populate('category').populate('resources');
  if (!career) return res.status(404).json({ error: 'Not found' });
  res.json(career);
});

// Create career
router.post('/', async (req: Request, res: Response) => {
  const { name, category, skills, learningPaths, resources, dailyTasks, description } = req.body;
  const career = new Career({ name, category, skills, learningPaths, resources, dailyTasks, description });
  await career.save();
  res.status(201).json(career);
});

export default router; 