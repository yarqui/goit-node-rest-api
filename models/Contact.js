import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";

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

Contact.sync();

export default Contact;
