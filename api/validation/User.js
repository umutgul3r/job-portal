const Joi = require("joi");

const createValidation = Joi.object({
  password: Joi.string().min(6).max(50).required(),
  email: Joi.string().min(5).max(50).required().email(),
});

const loginValidation = Joi.object({
  password: Joi.string().min(6).max(50).required(),
  email: Joi.string().min(5).max(50).required().email(),
});

const resetPasswordValidation = Joi.object({
  email: Joi.string().min(5).max(50).required().email(),
});

const updateValidation = Joi.object({
  full_name: Joi.string().min(3).max(50).required(),
});

module.exports = {
  loginValidation,
  createValidation,
  resetPasswordValidation,
  updateValidation,
};
