const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.MONGODB_URI; // MongoDB connection link from .env
let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        db = client.db('yourDatabaseName'); // Change to your database name
    })
    .catch(error => console.error(error));
    
// Add a route to check the connection status
app.get('/', (req, res) => {
    if (db) {
        res.send('Database connection status: Connected');
    } else {
        res.send('Database connection status: Not Connected');
    }
});



// Define a simple /ping route
app.get("/ping", (req, res) => {
    res.json({ message: "Pong! Server is running." });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});