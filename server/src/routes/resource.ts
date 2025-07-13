import express, { Request, Response } from 'express';
import Resource from '../models/Resource.js';

const router = express.Router();

// Get all resources
router.get('/', async (req: Request, res: Response) => {
  const resources = await Resource.find();
  res.json(resources);
});

// Create resource
router.post('/', async (req: Request, res: Response) => {
  const { title, url, type, description } = req.body;
  const resource = new Resource({ title, url, type, description });
  await resource.save();
  res.status(201).json(resource);
});

export default router; 