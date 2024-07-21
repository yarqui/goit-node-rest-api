import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().min(5).max(60).required(),
  phone: Joi.string().min(7).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(60),
  email: Joi.string().email().min(5).max(60),
  phone: Joi.string().min(7),
});
