// Importing necessary modules
const User = require('../models/User') // User model for interacting with the database
const jwt = require('jsonwebtoken') // Library for creating and verifying JWT tokens
require('dotenv').config() // Loads environment variables from a .env file

// Secret key for JWT token signing, stored in environment variables
const secretKey = process.env.JWT_SECRET

// Register user function
async function registerUser(req, res) {
  // Destructuring user details from the request body
  let { firstName, lastName, email, password } = req.body
  try {
    // Check if the email ends with @gmail.com
    if (!email.endsWith('@gmail.com')) {
      return res.status(400).send({ message: 'Email must be a Gmail address!' })
    }

    // Check if the email already exists in the database
    const duplicate = await User.find({ email })
    if (duplicate && duplicate.length > 0) {
      return res
        .status(400) // Return a 400 Bad Request status if the email is taken
        .send({ message: 'User already registered with this email' })
    }

    // Create a new user instance with the provided details
    let user = new User({ firstName, lastName, email, password })
    // Save the user to the database
    const result = await user.save()
    console.log(result) // Log the saved user data (for debugging)
    // Respond with success message
    res.status(201).send({ message: 'User registered successfully!' })
  } catch (err) {
    console.log(err) // Log any error for debugging
    res.status(400).send(err) // Respond with error message and status 400
  }
}

// Login user function
async function loginUser(req, res) {
  try {
    // Destructuring login credentials from the request body
    const { email, password } = req.body
    // Find the user by email
    const user = await User.findOne({ email })
    // If user is not found, respond with an error
    if (!user) {
      return res.status(404).send({ message: 'Authentication Failed!' })
    }
    // Check if the entered password matches the one stored in the database
    const isPasswordValid = await user.comparePassword(password)
    // If password is incorrect, respond with an error
    if (!isPasswordValid) {
      return res.status(404).send({ message: 'You Entered the Wrong Password' })
    }
    // Create a JWT token for the authenticated user
    let token = jwt.sign({ userId: user?._id }, secretKey, { expiresIn: '1h' })
    // Prepare the final response data including the token
    let finalData = {
      userId: user?._id,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      token, // Include the token in the response
    }
    // Respond with the user data and token
    res.send(finalData)
  } catch (err) {
    console.log(err) // Log any error for debugging
    res.status(400).send(err) // Respond with error message and status 400
  }
}

// Export the AuthController object with both functions
const AuthController = {
  registerUser,
  loginUser,
}

module.exports = AuthController // Export the AuthController for use in other files
