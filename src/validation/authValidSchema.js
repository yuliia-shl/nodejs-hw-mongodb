import Joi from 'joi';

export const registerUserValidSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(20).required(),
  password: Joi.string().min(3).max(20).required(),
});

export const loginUserValidSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
