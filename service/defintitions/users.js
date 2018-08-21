const db = require('../config/db');

const User = db.models.user;

async function getAllUsers(call, callback) {
  try {
    const data = await User.find();
    callback(null, { success: true, data: JSON.stringify(data) });
  } catch (error) {
    console.error(error);
    callback(error);
  }
}

async function updateUser(call, callback) {
  const { id, updates } = call.request;

  try {
    const upd = JSON.parse(updates);

    // TODO: Validate updates...

    // Get the user
    const user = await User.findById(id);

    // Add all updates to user...
    Object.entries(upd).forEach(([key, val]) => {
      user[key] = val;
    });

    // Save user
    const data = await user.save();
    callback(null, { success: true, data: JSON.stringify(data) });
  } catch (err) {
    console.error(err);
    callback(err);
  }
}

async function createUser(call, callback) {
  const {
    firstName, lastName, gender, email, phone, password,
  } = call.request;

  // Validate user details...

  try {
    const data = await User.create({
      firstName,
      lastName,
      gender,
      email,
      phone,
      password,
    });
    callback(null, { success: true, data: JSON.stringify(data) });
  } catch (err) {
    console.error(err);
    callback(err);
  }
}

async function deleteUserByID(call, callback) {
  const { id } = call.request;

  // Validate details...

  try {
    const data = await User.findByIdAndRemove(id);
    callback(null, { success: true, data: JSON.stringify(data) });
  } catch (err) {
    console.error(err);
    callback(err);
  }
}

async function getUserByID(call, callback) {
  const { id } = call.request;
  try {
    const user = await User.findById(id);

    if (!user) {
      callback(null, { success: true, data: null });
      return;
    }

    callback(null, { success: true, data: JSON.stringify(user) });
  } catch (error) {
    console.error(error);
    callback(error);
  }
}

module.exports = {
  getAllUsers,
  getUserByID,
  deleteUserByID,
  createUser,
  updateUser,
};
