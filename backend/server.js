require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const rentalRoutes = require('./routes/rentalRoutes');
const profileRoutes = require('./routes/profileRoutes'); // Profile routes

const app = express();

// Connect to DB
connectDB();

// CORS configuration
const allowedOrigins = ['http://localhost:5173', 'https://yourfrontenddomain.com']; // Replace with your actual frontend domain
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], // Allow necessary headers
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// Middleware
app.use(cors(corsOptions));  // Enable CORS with the specified options
app.use(express.json());     // Middleware to parse JSON requests

// Routes
app.use('/api/auth', authRoutes);      // User routes (signup/login)
app.use('/api/rentals', rentalRoutes); // Rental routes (start/end rentals)
app.use('/api/profile', profileRoutes); // Profile routes

// Example protected route
app.get('/api/protected', require('./middlewares/authMiddleware'), (req, res) => {
    res.json({ message: 'Protected route accessed', user: req.user });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error stack
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
