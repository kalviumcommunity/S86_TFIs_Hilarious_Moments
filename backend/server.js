const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;


const sceneRoutes = require("./routes");


app.use(express.json());
app.use("/api", sceneRoutes);


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));


app.get("/", (req, res) => {
    const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
    res.send(`Database connection status: ${status}`);
});


app.get("/ping", (req, res) => {
    res.json({ message: "Pong! Server is running." });
});


app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
