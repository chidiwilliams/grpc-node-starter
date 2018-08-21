const Joi = require('joi');

module.exports.validate = function validateStuff(value, schema) {
  const validation = Joi.validate(value, schema);
  if (validation.error !== null) throw new Error(validation.error.details[0].message);
};
