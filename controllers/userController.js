// User Controller - Handles all user-related business logic
const { User } = require("../models");

// Get all users
// TODO: Implement this function
// Steps:
//   1. Use User.findAll() to get all users from the database
//   2. Send the users back as JSON using response.json()
//   3. If something goes wrong, catch the error and send a 500 status with the error message
exports.getAllUsers = async (request, response) => {
  try {
    const users = await User.findAll();
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get single user by ID
// TODO: Implement this function
// Steps:
//   1. Use User.findByPk(request.params.id) to find one user by their ID
//   2. If no user is found, send a 404 status with { error: 'User not found' }
//   3. If found, send the user as JSON
exports.getUserById = async (request, response) => {
  try {
    const user = await User.findByPk(request.params.id);
    if (!user) {
      response.status(404).json({ error: "User not found" });
    } else {
      response.status(200).json(user);
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Create new user
// TODO: Implement this function
// Steps:
//   1. Use User.create(request.body) to create a new user with the data from the request
//   2. Send the new user back with a 201 status code
//   3. If validation fails, catch the error and send a 400 status
exports.createUser = async (request, response) => {
  try {
    // TODO: Create a new user from request.body and send it back with status 201
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Update user by ID
// TODO: Implement this function
// Steps:
//   1. Find the user by ID using User.findByPk()
//   2. If not found, send 404
//   3. Use user.update(request.body) to update the user's fields
//   4. Send the updated user as JSON
exports.updateUser = async (request, response) => {
  try {
    // TODO: Find user, check if exists, update, and send back
    const user = await User.findByPk(request.params.id);

    if (user) {
      await user.update(request.body);
      response.status(200).json(user);
    } else {
      response.status(404).json({ error: 'User not found'});
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Delete user by ID
// TODO: Implement this function
// Steps:
//   1. Find the user by ID using User.findByPk()
//   2. If not found, send 404
//   3. Use user.destroy() to delete the user
//   4. Send a success message: { message: 'User deleted successfully' }
exports.deleteUser = async (request, response) => {
  try {
    // TODO: Find user, check if exists, delete, and send success message
    const user = await User.findByPk(request.params.id);

    if (user) {
      await user.destroy();
      response.status(200).json({ message: 'User deleted successfully'});
    } else {
      response.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
