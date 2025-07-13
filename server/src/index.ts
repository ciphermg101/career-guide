import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import * as Sentry from '@sentry/node';
import categoryRoutes from './routes/category.js';
import careerRoutes from './routes/career.js';
import resourceRoutes from './routes/resource.js';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Sentry
if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN, environment: process.env.NODE_ENV });
  // @ts-ignore
  if (Sentry.Handlers && Sentry.Handlers.requestHandler) {
    // @ts-ignore
    app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
  }
}

// Middleware
app.use(helmet());
app.use(compression());
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://career-guide-api.onrender.com/*',
  'https://career-guide-six.vercel.app/*',
  process.env.CLIENT_ORIGIN,
].filter((origin): origin is string => Boolean(origin));

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/categories', categoryRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/resources', resourceRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Career Guide API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      categories: '/api/categories',
      careers: '/api/careers',
      resources: '/api/resources'
    }
  });
});

// Sentry error handler
if (process.env.SENTRY_DSN) {
  // @ts-ignore
  if (Sentry.Handlers && Sentry.Handlers.errorHandler) {
    // @ts-ignore
    app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);
  }
}

// Fallback error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (process.env.SENTRY_DSN) Sentry.captureException(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI!, { dbName: 'career_guide' })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    if (process.env.SENTRY_DSN) Sentry.captureException(err);
    process.exit(1);
  }); 