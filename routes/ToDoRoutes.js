// Importing the express library to create the router and handle HTTP requests
const express = require('express')
// Importing the toDoController methods for creating, getting, deleting, and updating to-dos
const {
  createToDo,
  getAllToDo,
  deleteToDo,
  updateToDo,
} = require('../controllers/toDoController')
// Importing the middleware to authenticate user tokens before allowing access to routes
const authenticateToken = require('../middleware/authJwt')
// Creating an express router instance to define the routes
const router = express.Router()

// Defining a POST route to create a new to-do task, with token authentication
router.post('/create-to-do', authenticateToken, createToDo)

// Defining a GET route to retrieve all to-do tasks for a specific user, with token authentication
router.get('/get-all-to-do/:userId', authenticateToken, getAllToDo)

// Defining a DELETE route to remove a specific to-do task by ID, with token authentication
router.delete('/delete-to-do/:id', authenticateToken, deleteToDo)

// Defining a PATCH route to update a specific to-do task by ID, with token authentication
router.patch('/update-to-do/:id', authenticateToken, updateToDo)

// Exporting the router so it can be used in the main app to handle to-do routes
module.exports = router
