require('dotenv').config();
const express = require('express');
const cors = require('cors');  // Import CORS
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://your-frontend-domain.com',  // Replace this with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow methods as needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Connect to DB
connectDB();

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
