import Joi from "joi";
import { emailRegex, subscriptionTypes } from "../constants/constants.js";

const authSchema = new Joi.object({
  email: Joi.string().regex(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
});

export default { authSchema, updateSubscriptionSchema };
