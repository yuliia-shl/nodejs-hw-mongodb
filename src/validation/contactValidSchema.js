import Joi from 'joi';
import { contactType } from '../constants/contactsConst.js';

export const addContactValidSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...contactType)
    .required(),
});

export const updateContactValidSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...contactType),
});
