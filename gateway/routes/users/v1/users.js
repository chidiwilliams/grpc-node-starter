const express = require('express');
const Joi = require('joi');
const proto = require('../../../includes/proto');

const router = express.Router();
const { UserRPC } = proto;

// Create a new User
router.post('/', async (req, res) => {
  const { fullName, email, password } = req.body;

  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
  });
  const validation = Joi.validate(req.body, schema);
  if (validation.error !== null) {
    res.status(400).send({
      success: false,
      message: validation.error.details[0].message,
    });
    return;
  }

  try {
    const user = await UserRPC.createUser({ fullName, email, password });
    res.json({ success: true, data: JSON.parse(user.data) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
});

// Get User by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserRPC.getUserByID({ id });
    if (!user.data) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
    }
    res.json({ success: true, data: JSON.parse(user.data) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await UserRPC.getAllUsers({});
    res.json({ success: true, data: JSON.parse(users.data) });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Update User
router.post('/:id', async (req, res) => {
  const { fullName, email, password } = req.body;
  const { id } = req.params;

  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
  });
  const validation = Joi.validate(req.body, schema);
  if (validation.error !== null) {
    res.status(400).send({
      success: false,
      message: validation.error.details[0].message,
    });
    return;
  }

  try {
    const user = await UserRPC.updateUser({
      id,
      updates: JSON.stringify({ fullName, email, password }),
    });
    if (!user.data) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
    }
    res.json({ success: true, data: JSON.parse(user.data) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
});

// Delete a User
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserRPC.deleteUserByID({ id });
    if (!user.data) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

module.exports = router;
