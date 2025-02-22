// Importing the mongoose library to interact with MongoDB
const mongoose = require('mongoose')
// Destructuring the 'Schema' object from mongoose to define the structure of the document
const { Schema } = mongoose
// Importing bcrypt for hashing passwords
const bcrypt = require('bcrypt')

// Defining the schema for the User model
const userSchema = new Schema({
  firstName: { type: String, required: true }, // User's first name
  lastName: { type: String, required: true }, // User's last name
  email: { type: String, required: true, unique: true }, // Email is required for each user and should be unique
  password: { type: String, required: true }, // Password is required and will be hashed
})

// Middleware to hash the password before saving the user document
userSchema.pre('save', async function (next) {
  const user = this // Access the current user document being saved
  // If the password is not modified, skip the hashing process
  if (!user.isModified('password')) return next()

  // Generating a salt with 10 rounds to hash the password
  let salt = await bcrypt.genSalt(10)
  // Hashing the password with the generated salt
  let hash = await bcrypt.hash(user.password, salt)
  // Assign the hashed password to the user document
  user.password = hash
  // Move to the next middleware or save operation
  next()
})

// Instance method to compare a candidate password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
  // Using bcrypt's compare method to check if the entered password matches the stored hash
  return bcrypt.compare(password, this.password)
}

// Creating the User model using the defined schema
const User = mongoose.model('User', userSchema)

// Exporting the User model so it can be used in other parts of the application
module.exports = User
