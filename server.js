// Importing necessary dependencies
const express = require('express') // Express.js framework for creating the server
const app = express() // Creating an instance of the Express application
const cors = require('cors') // CORS middleware to handle cross-origin requests
// const path = require('path')  // (Commented out) module to handle and transform file paths
const mongoose = require('mongoose') // Mongoose for interacting with MongoDB
const AuthRoutes = require('./routes/authRoutes') // Importing authentication routes
const toDoRoutes = require('./routes/ToDoRoutes') // Importing To-Do routes
const path = require('path')
require('dotenv').config() // Loading environment variables from .env file

// Setting the port for the server to listen on, defaulting to 5000
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'client/build')))
// Middleware setup
app.use(cors()) // Enabling Cross-Origin Resource Sharing (CORS)
app.use(express.json()) // Middleware to parse incoming JSON requests

// Uncommented: Serve static files from the client build (optional)
// app.use(express.static(path.join(__dirname, 'client/build')))

// Route handling
app.use('/api', AuthRoutes) // Handling authentication-related routes
app.use('/api/todo', toDoRoutes) // Handling to-do related routes

// MongoDB connection setup
mongoose
  .connect(process.env.DB_URL) // Connect to the MongoDB database using the URL from the .env file
  .then(() => console.log('The DB is connected successfully!')) // Success message on successful DB connection
  .catch(error => {
    console.error('MongoDB Connection Error ❌', error) // Error handling if the DB connection fails
  })

// Starting the server and listening for incoming requests
app.listen(PORT, () => {
  console.log(`Server connected at ${PORT}`) // Message indicating that the server is running
})
