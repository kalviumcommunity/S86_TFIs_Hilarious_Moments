const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api/moments", require("./routes/momentRoutes"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
