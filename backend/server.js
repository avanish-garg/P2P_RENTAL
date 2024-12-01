require("dotenv").config();
const http = require("http");
const connectDB = require("./config/db");  // MongoDB connection
const app = require("./app");  // Import the updated app.js

// Connect to MongoDB
connectDB();  // Ensure MongoDB connection works correctly

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
