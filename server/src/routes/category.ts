import express, { Request, Response } from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// Get all categories
router.get('/', async (req: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
});

// Create category
router.post('/', async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const category = new Category({ name, description });
  await category.save();
  res.status(201).json(category);
});

export default router; 