// Importing the express library to create the router and handle HTTP requests
const express = require('express')
// Importing the AuthController where the register and login logic is implemented
const AuthController = require('../controllers/authController')
// Creating an express router instance to define the routes
const router = express.Router()

// Defining a POST route for user registration, which triggers the registerUser method in AuthController
router.post('/register', AuthController.registerUser)

// Defining a POST route for user login, which triggers the loginUser method in AuthController
router.post('/login', AuthController.loginUser)

// Exporting the router so it can be used in the main app to handle authentication routes
module.exports = router
