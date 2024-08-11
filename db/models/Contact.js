import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import { emailRegex } from "../../constants/constants.js";

const Contact = sequelize.define("Contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [2, 60] },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { is: emailRegex },
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
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Contact.sync();

export default Contact;
