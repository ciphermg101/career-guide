[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19932637&assignment_repo_type=AssignmentRepo)
# Career Guidance Platform (MERN)

## Overview
A full-stack MERN application for exploring tech career paths, with a modern, animated, and responsive UI.

## Project Structure
```
/
  client/      # React + Vite + Tailwind + shadcn/ui (TypeScript, production-ready)
    src/
      components/
      pages/
      lib/
      index.css
      App.tsx
      main.jsx
    .env.example
    package.json
    ...
  server/      # Express + TypeScript + MongoDB (production-ready)
    src/
      models/
      routes/
      index.ts
    .env.example
    package.json
    ...
  README.md    # This file
  DEPLOYMENT.md # Deployment guide
```

## Features
- Browse careers by category
- Search/filter roles
- Career detail modals
- Admin dashboard (add/edit careers, categories, resources)
- Production-ready backend (Express + MongoDB)
- Modern frontend (React + Tailwind + shadcn/ui)
- CI/CD, monitoring, and deployment ready

## 🚀 Live URLs

### Production Deployment
- **Frontend**: [https://your-app-name.vercel.app](https://your-app-name.vercel.app)
- **Backend API**: [https://career-guide-api.onrender.com](https://career-guide-api.onrender.com)
- **API Health Check**: [https://career-guide-api.onrender.com/health](https://career-guide-api.onrender.com/health)

### API Endpoints
- Categories: `GET /api/categories`
- Careers: `GET /api/careers`
- Resources: `GET /api/resources`
- Health: `GET /health`

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Vercel/Netlify (frontend deployment)
- Render/Railway/Heroku (backend deployment)

### Environment Variables
- Copy `.env.example` in both `/client` and `/server` to `.env` and fill in values.

#### Example `/client/.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_SENTRY_DSN=your_sentry_dsn
```

#### Example `/server/.env`:
```
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=production
PORT=5000
SENTRY_DSN=your_sentry_dsn
```

### Running Locally

#### Backend
```
cd server
npm install
npm run dev
```

#### Frontend
```
cd client
npm install
npm run dev
```

## 🚀 Deployment

### Quick Deploy
1. **Backend (Render)**: Follow the [deployment guide](DEPLOYMENT.md#backend-deployment-render)
2. **Frontend (Vercel)**: Follow the [deployment guide](DEPLOYMENT.md#frontend-deployment-vercel)
3. **CI/CD**: Set up GitHub Actions for automatic deployments

### Manual Deployment Steps
1. Deploy backend to Render
2. Deploy frontend to Vercel
3. Configure environment variables
4. Update CORS settings
5. Test integration

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 📊 Monitoring & CI/CD

### GitHub Actions
- Automated testing on pull requests
- Automatic deployment on main branch
- Linting and code quality checks

### Monitoring
- Sentry for error tracking
- Health check endpoints
- Uptime monitoring

### Performance
- Code splitting for better performance
- Compression and caching
- Optimized builds

## 🛠️ Development

### Available Scripts

#### Backend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

#### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Database Seeding
```bash
cd server
npm run seed     # Seed database with sample data
```

## 📱 Screenshots
- ![App Screenshot](screenshots/app.png)
- ![CI/CD Pipeline](screenshots/cicd.png)

## 🔧 Maintenance
- Regular updates and patches
- Database backups
- Documented rollback procedures
- Performance monitoring

## 📄 License
This project is part of the Week 7 DevOps Deployment Assignment.

---

**Note**: Replace `your-app-name.vercel.app` and `career-guide-api.onrender.com` with your actual deployed URLs after deployment. 