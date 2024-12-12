require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const rentalRoutes = require('./routes/rentalRoutes');

const app = express();

// Connect to DB
connectDB();

// CORS configuration
const allowedOrigins = ['http://localhost:5173', 'https://yourfrontenddomain.com']; // Add your frontend domain here


const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // If you need to send cookies or authorization headers
};

app.use(cors(corsOptions)); // Enable CORS with the specified options

app.use(express.json());  // Middleware to parse JSON requests

// Routes
app.use('/api/auth', authRoutes);      // User routes (signup/login)
app.use('/api/rentals', rentalRoutes); // Rental routes (start/end rentals)

// Example protected route
app.get('/api/protected', require('./middlewares/authMiddleware'), (req, res) => {
    res.json({ message: 'Protected route accessed', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
