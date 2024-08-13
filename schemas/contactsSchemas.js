import Joi from "joi";
import { emailRegex } from "../constants/constants.js";

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().regex(emailRegex).required(),
  phone: Joi.string().min(7).required(),
  favorite: Joi.bool(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(60),
  email: Joi.string().regex(emailRegex),
  phone: Joi.string().min(7),
  favorite: Joi.bool(),
});

const updateContactStatusSchema = Joi.object({
  favorite: Joi.bool().required(),
});

export default {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
};
