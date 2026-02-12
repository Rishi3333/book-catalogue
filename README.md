# 📚 Book Catalogue Application

A full-stack web application for managing a book collection with CRUD operations. Built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

## ✨ Features

- ✅ Add new books with title, author, genre, year, and description
- ✅ View all books in a clean, responsive grid layout
- ✅ Update existing book details
- ✅ Delete books from the catalogue
- ✅ Full CRUD operations with MongoDB
- ✅ Input validation on frontend and backend
- ✅ Error handling and user feedback
- ✅ Responsive design for mobile and desktop

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3
- JavaScript (Vanilla)

**Backend:**
- Node.js
- Express.js
- Mongoose

**Database:**
- MongoDB

## 📁 Project Structure

```
book-catalogue/
└── backend/
    ├── models/
    │   └── Book.js          # Mongoose schema for books
    ├── routes/
    │   └── books.js         # API routes for CRUD operations
    ├── .env                 # Environment variables
    ├── public/              ← Frontend files here
    │   ├── index.html
    │   ├── styles.css
    │   ├── app.js
    │   └── background.png
    ├── package.json         # Backend dependencies
    └── server.js            # Express server setup

```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local installation or MongoDB Atlas account)
- Git

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd book-catalogue
```

### Step 2: Setup Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `.env` file
   - For **local MongoDB**:
     ```
     MONGODB_URI=mongodb://localhost:27017/bookcatalogue
     ```
   - For **MongoDB Atlas**:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookcatalogue?retryWrites=true&w=majority
     ```

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Step 3: Setup Frontend

Frontend will automatically start once you run:
```bash
npm start
```
Open your browser and go to `http://localhost:5000`

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get single book by ID |
| POST | `/api/books` | Create a new book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

### Example API Request (Create Book)

```javascript
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "year": 1925,
  "description": "A classic American novel"
}
```

## 🔧 Configuration

### MongoDB Setup

**Option 1: Local MongoDB**
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/bookcatalogue`

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update `.env` file with your connection string

### CORS Configuration

The backend is configured to accept requests from any origin. For production, update the CORS settings in `server.js`:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

---

## 🖼️ **Adding Your Image:**

1. **Save your image** as `background.png` (or whatever name you prefer)
2. **Place it in the `frontend` folder** (same folder as `index.html`)

---

## 🎯 Usage

1. **Add a Book**: Fill in the form at the top with book details and click "Add Book"
2. **View Books**: All books are displayed in cards below the form
3. **Edit a Book**: Click the "Edit" button on any book card, modify details, and click "Update Book"
4. **Delete a Book**: Click the "Delete" button and confirm the deletion

## ✅ Validation

**Frontend Validation:**
- All required fields must be filled
- Year must be between 1000 and 2026
- Real-time form validation

**Backend Validation:**
- Mongoose schema validation
- Required field checks
- Data type validation
- Year range validation

## 🐛 Troubleshooting

**Problem: Cannot connect to MongoDB**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access in MongoDB Atlas

**Problem: CORS errors**
- Check if backend is running on port 5000
- Verify API_URL in `frontend/app.js`

**Problem: Books not loading**
- Check browser console for errors
- Ensure backend server is running
- Verify MongoDB connection

## 📦 Deployment

### Backend Deployment (Heroku/Render)
1. Create account on hosting platform
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Netlify/Vercel)
1. Update API_URL in `app.js` to your backend URL
2. Deploy frontend folder
3. Configure build settings if needed

## 🤝 Contributing

This is a learning project for the GDP Web Task workshop. Feel free to:
- Add new features
- Improve the UI
- Enhance error handling
- Add search/filter functionality

## 📄 License

This project is created for educational purposes as part of the GDP Web Task assignment.

## 👨‍💻 Author

Created as part of the GDP Web Development Workshop - February 2026

## 📞 Support

For any questions or issues:
- Check the troubleshooting section
- Review the API documentation
