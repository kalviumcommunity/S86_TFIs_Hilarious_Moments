const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI; // Fetch MongoDB URI from .env

// Import Routes
const sceneRoutes = require("./routes"); // Ensure you have a `routes.js` file

// Middleware
app.use(express.json());
app.use("/api", sceneRoutes); // Mounting the routes under "/api"

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Check DB connection status
app.get("/", (req, res) => {
    const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
    res.send(`Database connection status: ${status}`);
});

// Define a simple /ping route
app.get("/ping", (req, res) => {
    res.json({ message: "Pong! Server is running." });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
