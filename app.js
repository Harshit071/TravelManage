// app.js
const express = require('express');
const cors = require('cors'); // Import CORS
const db = require('./db/db'); // MySQL connection pool
const travelRoutes = require('./routes/travel-route'); // Import travel routes
require('dotenv').config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors())
app.use(express.json()); // Middleware to parse JSON requests

// Test MySQL connection before starting the server
db.getConnection()
  .then(connection => {
    console.log('MySQL connected successfully');
    connection.release(); // Release the connection back to the pool

    // After successful DB connection, start the server and define the routes

    // Define routes
    app.use('/api', travelRoutes);

    // Start the server after confirming the DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch(error => {
    console.error('MySQL connection failed:', error.message);
    process.exit(1); // Exit the process if DB connection fails
  });
