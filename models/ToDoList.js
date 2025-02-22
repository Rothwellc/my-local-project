// Import mongoose to interact with MongoDB
const mongoose = require('mongoose')
const { Schema } = mongoose

// Define the ToDo schema
const toDoSchema = new Schema(
  {
    // Title of the task (required)
    title: { type: String, required: true },

    // Description of the task (required)
    description: { type: String, required: true },

    // Boolean flag to track if the task is completed (required)
    isCompleted: { type: Boolean, required: true },

    // Date when the task is completed (optional)
    completedOn: String,

    // Reference to the User model who created this task (uses ObjectId)
    createdBy: {
      ref: 'User', // Refers to the 'User' model
      type: Schema.ObjectId, // The type is an ObjectId referencing the 'User' collection
    },
  },
  {
    // Timestamps option will automatically add `createdAt` and `updatedAt` fields
    timestamps: true,
  },
)

// Create the ToDo model using the schema defined above
const ToDo = mongoose.model('ToDo', toDoSchema)

// Export the ToDo model so it can be used in other parts of the application
module.exports = ToDo
