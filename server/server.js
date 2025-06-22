const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // For serving static files
const connectDB = require('./config/db'); // Database connection

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// Enable CORS for all routes - restrict to frontend_url in production
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173' // Allow requests from your React frontend
}));
app.use(express.json()); // Body parser for JSON data
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data

// Serve static uploaded images from the 'uploads' directory
// This makes images accessible via http://localhost:5000/uploads/imageName.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import Routes
const itemRoutes = require('./routes/itemRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

// Use Routes
app.use('/api/items', itemRoutes);
app.use('/api/enquire', enquiryRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Outfit Atlas Backend API is running...');
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Connected to MongoDB: ${process.env.MONGODB_URI.split('@')[0]}...`); // Log without full password
});