#!/bin/bash

# Fix for Vercel Build Permission Issues
# Run this script to push the fixes to GitHub

echo "🔧 Pushing fixes to GitHub..."

# Check current git user
echo "Current git user:"
git config user.name
git config user.email

echo ""
echo "If this is not the correct user, you need to:"
echo "1. Login with Ravigupta0522 account"
echo "2. Or add vineetkumarsharma17 as collaborator to the repo"
echo ""

# Try to push
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "Vercel will automatically redeploy with the fixes."
else
    echo "❌ Push failed. Please check your GitHub permissions."
    echo ""
    echo "Alternative: Manually update Vercel settings:"
    echo "1. Go to Vercel Dashboard"
    echo "2. Settings → Build & Development Settings"
    echo "3. Install Command: npm install --legacy-peer-deps"
    echo "4. Build Command: chmod +x node_modules/.bin/vite && npm run build"
    echo "5. Save and Redeploy"
fi
