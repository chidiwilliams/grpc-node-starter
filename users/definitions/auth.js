const Joi = require('joi');
const db = require('../config/db');
const { safeStringify } = require('../util');

const User = db.models.user;

async function authenticateUserWithEmailAndPassword(call, callback) {
  const { email, password } = call.request;

  try {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
    });

    const validation = Joi.validate({ email, password }, schema);
    if (validation.error !== null) throw new Error(validation.error.details[0].message);

    const user = await User.findOne({ email });
    if (!user) {
      callback(null, {
        success: false,
        message: 'Authentication failed. User not found.',
      });
      return;
    }

    // Check password
    const isCorrectPassword = user.comparePassword(password);
    if (!isCorrectPassword) {
      callback(null, {
        success: false,
        message: 'Authentication failed. Incorrect password.',
      });
      return;
    }

    callback(null, {
      success: true,
      data: safeStringify(user),
    });
  } catch (err) {
    console.error(err);
    callback(err);
  }
}

module.exports = {
  authenticateUserWithEmailAndPassword,
};
