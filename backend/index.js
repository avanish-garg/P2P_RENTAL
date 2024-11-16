const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/items", require("./routes/itemRoutes"));

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("Database connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
