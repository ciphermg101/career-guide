# 🚀 Deployment Guide: MERN App on Render + Vercel

This guide will walk you through deploying your Career Guide MERN application with the backend on Render and frontend on Vercel.

## 📋 Prerequisites

- GitHub account with your repository
- Render account (free tier available)
- Vercel account (free tier available)
- MongoDB Atlas cluster (free tier available)

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Render Deployment

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Create an account or sign in

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service Settings**
   ```
   Name: career-guide-api
   Root Directory: server
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Set Environment Variables**
   In Render dashboard, add these environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   SENTRY_DSN=your_sentry_dsn
   CLIENT_ORIGIN=https://your-frontend-domain.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend

### Step 2: Get Backend URL

After deployment, Render will provide a URL like:
```
https://career-guide-api.onrender.com
```

Test the health endpoint:
```
https://career-guide-api.onrender.com/health
```

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Vercel Deployment

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Create an account or sign in with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `client`

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Set Environment Variables**
   In Vercel dashboard, add:
   ```
   VITE_API_URL=https://career-guide-api.onrender.com/api
   VITE_SENTRY_DSN=your_sentry_dsn
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your frontend

### Step 2: Get Frontend URL

After deployment, Vercel will provide a URL like:
```
https://your-app-name.vercel.app
```

## 🔗 Integration Setup

### Step 1: Update Backend CORS

1. **Update the CORS configuration** in `server/src/index.ts`:
   ```typescript
   const allowedOrigins = [
     'http://localhost:5173',
     'http://localhost:3000',
     'https://your-app-name.vercel.app', // Your actual Vercel domain
     process.env.CLIENT_ORIGIN,
   ].filter((origin): origin is string => Boolean(origin));
   ```

2. **Redeploy the backend** on Render

### Step 2: Update Frontend API URL

1. **Update environment variables** in Vercel:
   ```
   VITE_API_URL=https://career-guide-api.onrender.com/api
   ```

2. **Redeploy the frontend** on Vercel

## 🤖 CI/CD Setup (GitHub Actions)

### Step 1: Set GitHub Secrets

In your GitHub repository → Settings → Secrets and variables → Actions:

```
RENDER_SERVICE_ID=your_render_service_id
RENDER_API_KEY=your_render_api_key
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
VITE_API_URL=https://career-guide-api.onrender.com/api
```

### Step 2: Get Required IDs

**Render Service ID:**
- Go to your Render service dashboard
- Copy the service ID from the URL or settings

**Render API Key:**
- Go to Render dashboard → Account → API Keys
- Create a new API key

**Vercel Tokens:**
- Go to Vercel dashboard → Settings → Tokens
- Create a new token

**Vercel Project/Org IDs:**
- Use Vercel CLI: `vercel link` in your project
- Check `.vercel/project.json` file

## 🧪 Testing Your Deployment

### Backend Testing
```bash
# Health check
curl https://career-guide-api.onrender.com/health

# Test API endpoints
curl https://career-guide-api.onrender.com/api/categories
curl https://career-guide-api.onrender.com/api/careers
curl https://career-guide-api.onrender.com/api/resources
```

### Frontend Testing
1. Visit your Vercel URL
2. Test all features:
   - Browse careers
   - Search functionality
   - Category filtering
   - Career detail modals

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your Vercel domain is in the allowed origins
   - Check environment variables are set correctly

2. **API Connection Issues**
   - Verify `VITE_API_URL` is correct in Vercel
   - Check if backend is running on Render

3. **Build Failures**
   - Check build logs in Render/Vercel
   - Ensure all dependencies are in package.json

4. **Environment Variables**
   - Double-check all environment variables are set
   - Ensure no typos in variable names

### Debugging Steps

1. **Check Render Logs**
   - Go to your Render service → Logs
   - Look for any error messages

2. **Check Vercel Logs**
   - Go to your Vercel project → Functions
   - Check build and function logs

3. **Test Locally**
   - Test with production environment variables locally
   - Ensure everything works before deploying

## 📊 Monitoring

### Sentry Setup
1. Create a Sentry project
2. Get your DSN
3. Add to both Render and Vercel environment variables
4. Monitor errors in Sentry dashboard

### Health Checks
- Set up uptime monitoring for your backend URL
- Monitor API response times
- Set up alerts for downtime

## 🔄 Updates and Maintenance

### Automatic Deployments
- Both Render and Vercel will auto-deploy on git push
- GitHub Actions will run tests before deployment

### Manual Deployments
- Render: Trigger redeploy from dashboard
- Vercel: Trigger redeploy from dashboard or CLI

### Database Management
- Regular backups of MongoDB Atlas
- Monitor database performance
- Set up alerts for storage limits

## 📝 Final Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables configured
- [ ] CORS properly set up
- [ ] API endpoints working
- [ ] Frontend connecting to backend
- [ ] CI/CD pipeline working
- [ ] Monitoring set up
- [ ] Health checks passing
- [ ] All features tested

## 🎉 Success!

Your MERN application is now deployed and accessible worldwide! 

**Live URLs:**
- Frontend: `https://your-app-name.vercel.app`
- Backend: `https://career-guide-api.onrender.com`
- API Health: `https://career-guide-api.onrender.com/health`

Remember to update your README.md with these live URLs! 