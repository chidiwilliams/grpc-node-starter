/*
Users schema
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: false,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Hash the user password before save
UserSchema.pre('save', function hashPassword(next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) {
      next(err);
      return;
    }

    this.password = hash;
    next();
  });
});

// Compare a given password with the database hash
UserSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = UserSchema;
