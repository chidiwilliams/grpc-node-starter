const Joi = require('joi');
const db = require('../config/db');

const User = db.models.user;

async function createUser(call, callback) {
  const { fullName, email, password } = call.request;

  try {
    const schema = Joi.object().keys({
      fullName: Joi.string().optional(),
      email: Joi.string()
        .email()
        .optional(),
      password: Joi.string().optional(),
    });

    const validation = Joi.validate({ fullName, email, password }, schema);
    if (validation.error !== null) throw new Error(validation.error.details[0].message);

    const data = await User.create({ fullName, email, password });
    callback(null, {
      success: true,
      data: JSON.stringify(data, (key, val) => (val !== null ? val : undefined)),
    });
  } catch (err) {
    console.error(err);
    callback(err);
  }
}

async function getUserByID(call, callback) {
  const { id } = call.request;
  try {
    const schema = Joi.object().keys({ id: Joi.string().required() });
    const validation = Joi.validate({ id }, schema);
    if (validation.error !== null) throw new Error(validation.error.details[0].message);

    const user = await User.findById(id);

    callback(null, {
      success: true,
      data: JSON.stringify(user, (key, val) => (val !== null ? val : undefined)),
    });
  } catch (error) {
    console.error(error);
    callback(error);
  }
}

async function getAllUsers(call, callback) {
  try {
    const data = await User.find();
    callback(null, {
      success: true,
      data: JSON.stringify(data, (key, val) => (val !== null ? val : undefined)),
    });
  } catch (error) {
    console.error(error);
    callback(error);
  }
}

async function updateUser(call, callback) {
  const { id, updates } = call.request;

  try {
    const upd = JSON.parse(updates);
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      fullName: Joi.string().optional(),
      email: Joi.string()
        .email()
        .optional(),
      password: Joi.string().optional(),
    });

    const validation = Joi.validate({ id, ...upd }, schema);
    if (validation.error !== null) throw new Error(validation.error.details[0].message);

    const user = await User.findById(id);

    // Add all updates to user...
    Object.entries(upd).forEach(([key, val]) => {
      user[key] = val;
    });

    // Save user
    const data = await user.save();
    callback(null, {
      success: true,
      data: JSON.stringify(data, (key, val) => (val !== null ? val : undefined)),
    });
  } catch (error) {
    console.error(error);
    callback(error);
  }
}

async function deleteUserByID(call, callback) {
  const { id } = call.request;

  // Validate details...

  try {
    const schema = Joi.object().keys({ id: Joi.string().required() });
    const validation = Joi.validate({ id }, schema);
    if (validation.error !== null) throw new Error(validation.error.details[0].message);

    const data = await User.findByIdAndRemove(id);
    callback(null, {
      success: true,
      data: JSON.stringify(data, (key, val) => (val !== null ? val : undefined)),
    });
  } catch (err) {
    console.error(err);
    callback(err);
  }
}

module.exports = {
  getAllUsers,
  getUserByID,
  deleteUserByID,
  createUser,
  updateUser,
};
