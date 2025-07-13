#!/bin/bash

echo "🚀 MERN App Deployment Setup"
echo "=============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."

echo "Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi

echo "Installing client dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi

cd ..

# Build both projects
echo ""
echo "🔨 Building projects..."

echo "Building server..."
cd server
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build server"
    exit 1
fi

echo "Building client..."
cd ../client
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build client"
    exit 1
fi

cd ..

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Create accounts on Render and Vercel"
echo "2. Set up MongoDB Atlas cluster"
echo "3. Follow the deployment guide in DEPLOYMENT.md"
echo "4. Configure environment variables"
echo "5. Deploy backend to Render"
echo "6. Deploy frontend to Vercel"
echo "7. Test the integration"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md" 