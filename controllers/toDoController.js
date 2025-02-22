// Importing the ToDo model for interacting with the database
const ToDo = require('../models/ToDoList')

// Function to create a new To-Do task
exports.createToDo = async (req, res) => {
  try {
    // Get the data (task details) from the request body
    const data = req.body
    // Create a new ToDo instance with the provided data
    const todo = new ToDo(data)
    // Save the new ToDo task to the database
    const result = await todo.save()
    console.log(result) // Log the result for debugging
    // Respond with a success message
    res.status(201).send({ message: 'Created New Task!' })
  } catch (err) {
    console.log(err) // Log any error for debugging
    res.status(err) // Respond with the error status
  }
}

// Function to get all To-Do tasks for a specific user
exports.getAllToDo = async (req, res) => {
  // Get the userId from the request parameters
  let { userId } = req.params

  try {
    // Find all tasks created by the specified user
    const result = await ToDo.find({ createdBy: userId })
    // Respond with the list of tasks
    res.send(result)
  } catch (err) {
    console.log(err) // Log any error for debugging
    res.status(400).send(err) // Respond with error message and status 400
  }
}

// Function to update a specific To-Do task
exports.updateToDo = async (req, res) => {
  try {
    // Get the task id from the request parameters
    const { id } = req.params
    // Get the updated task data from the request body
    const data = req.body
    // Find the task by its id and update it with the provided data
    const result = await ToDo.findByIdAndUpdate(
      id, // Find the task by id
      { $set: data }, // Set the new data to the task
      { returnOriginal: false }, // Return the updated task, not the original
    )
    console.log(result) // Log the result for debugging
    // Respond with a success message
    res.send({ message: 'Task Updated!' })
  } catch (err) {
    console.log(err) // Log any error for debugging
    res.status(400).send(err) // Respond with error message and status 400
  }
}

// Function to delete a specific To-Do task
exports.deleteToDo = async (req, res) => {
  try {
    // Get the task id from the request parameters
    const { id } = req.params
    // Find the task by id and delete it
    const result = await ToDo.findByIdAndDelete(id)
    console.log(result) // Log the result for debugging
    // Respond with a success message
    res.send({ message: 'Task Deleted!' })
  } catch (err) {
    console.log(err) // Log any error for debugging
    res.status(400).send(err) // Respond with error message and status 400
  }
}
