// Importing the 'jsonwebtoken' package to handle JWT verification
const jwt = require('jsonwebtoken')
// Loading environment variables from the .env file
require('dotenv').config()
// Storing the JWT secret key from environment variables
const secretKey = process.env.JWT_SECRET

// Middleware function to authenticate a user's token
const authenticateToken = async (req, res, next) => {
  // Get the token from the Authorization header of the request
  let token = req.header('Authorization')

  // If no token is provided, send a 401 Unauthorized response
  if (!token) return res.status(401).send({ message: 'Authentication Failed!' })

  // Verify the token using the secret key and callback function
  jwt.verify(token, secretKey, (err, user) => {
    // If an error occurs (e.g., invalid token), respond with a 403 Forbidden status
    if (err)
      return res
        .status(403)
        .send({ message: 'Token is not valid! Please Login again!' })

    // If the token is valid, attach the user information to the request object
    req.user = user
    // Proceed to the next middleware or route handler
    next()
  })
}

// Exporting the authenticateToken function to use in other parts of the application
module.exports = authenticateToken
