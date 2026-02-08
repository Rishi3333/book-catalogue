# 🚀 Quick Setup Guide

## For First-Time Setup

### 1. Install Dependencies

```bash
# Navigate to backend folder
cd backend
npm install

# This installs:
# - express (web framework)
# - mongoose (MongoDB ODM)
# - cors (handle cross-origin requests)
# - dotenv (environment variables)
```

### 2. Setup MongoDB

**Choose ONE option:**

**Option A: Local MongoDB (Recommended for beginners)**
```bash
# Install from: https://www.mongodb.com/try/download/community
# Start MongoDB service:
# - Windows: MongoDB runs automatically after installation
# - Mac: brew services start mongodb-community
# - Linux: sudo systemctl start mongod

# Your .env should have:
MONGODB_URI=mongodb://localhost:27017/bookcatalogue
```

**Option B: MongoDB Atlas (Cloud - Free tier available)**
```bash
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create free account and cluster
# 3. Get connection string
# 4. Update .env with:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookcatalogue?retryWrites=true&w=majority
```

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Should see: "✅ Connected to MongoDB" and "🚀 Server is running on http://localhost:5000"
```

**Terminal 2 - Frontend:**
```bash
cd frontend
# Simply open index.html in your browser
# OR use a local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

### 4. Test the Application

1. Open browser to `http://localhost:8000` (or just open `index.html`)
2. You should see "Book Catalogue" page
3. Add a test book
4. Verify it appears in the list

## 📤 GitHub Deployment

### Initialize Git Repository

```bash
# In the book-catalogue root folder
git init
git add .
git commit -m "Initial commit: Book Catalogue Application"
```

### Create GitHub Repository

1. Go to https://github.com
2. Click "New Repository"
3. Name: `book-catalogue`
4. Don't initialize with README (we already have one)
5. Create repository

### Push to GitHub

```bash
# Replace YOUR-USERNAME with your GitHub username
git remote add origin https://github.com/YOUR-USERNAME/book-catalogue.git
git branch -M main
git push -u origin main
```

## 🌐 Deploy Online (Optional)

### Backend - Render.com (Free)

1. Go to https://render.com
2. Sign up with GitHub
3. New > Web Service
4. Connect your repository
5. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
7. Deploy!

### Frontend - Netlify (Free)

1. Go to https://www.netlify.com
2. Sign up with GitHub
3. New site from Git
4. Choose your repository
5. Configure:
   - Base directory: `frontend`
   - Publish directory: `frontend`
6. Before deploying, update `frontend/app.js`:
   ```javascript
   const API_URL = 'https://your-render-backend.onrender.com/api/books';
   ```
7. Deploy!

## ⚠️ Common Issues

**Issue: "Cannot connect to MongoDB"**
```bash
# Solution: Make sure MongoDB is running
# Local: Check if MongoDB service is active
# Atlas: Check if IP is whitelisted (use 0.0.0.0/0 for testing)
```

**Issue: "CORS error" in browser console**
```bash
# Solution: Backend not running or wrong API_URL
# Check: Is backend running on port 5000?
# Update: API_URL in app.js to match your backend
```

**Issue: Frontend shows blank page**
```bash
# Solution: 
# 1. Open browser console (F12)
# 2. Check for errors
# 3. Verify API_URL is correct
# 4. Make sure backend is running
```

## ✅ Pre-Submission Checklist

- [ ] Backend server starts without errors
- [ ] Frontend loads and displays properly
- [ ] Can add a new book
- [ ] Can edit a book
- [ ] Can delete a book
- [ ] All books display correctly
- [ ] Code is pushed to GitHub
- [ ] README.md is complete
- [ ] Repository is public (for evaluation)

## 📝 What to Submit

Share this GitHub repository link:
```
https://github.com/YOUR-USERNAME/book-catalogue
```

Make sure the repository includes:
- ✅ Complete backend code
- ✅ Complete frontend code
- ✅ README.md with instructions
- ✅ .gitignore file

---

**Need Help?** Reach out to your workshop instructors!

**Deadline:** 8th February 2026, 12 PM

Good luck! 🎉
