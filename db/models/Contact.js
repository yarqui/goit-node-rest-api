import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const Contact = sequelize.define("Contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [2, 60] },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true, len: [5, 60] }, // TODO: is: regex...
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

// Contact.sync();

export default Contact;
