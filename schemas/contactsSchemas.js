import Joi from "joi";
import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().min(5).max(60).required(),
  phone: Joi.string().min(7).required(),
  favorite: Joi.bool(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(60),
  email: Joi.string().email().min(5).max(60),
  phone: Joi.string().min(7),
  favorite: Joi.bool(),
});

const updateContactStatusSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = sequelize.define("Contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [2, 60] },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true, len: [5, 60] },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { min: 7 },
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const contactSchemas = {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
};

export { Contact, contactSchemas };
