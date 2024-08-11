import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import { emailRegex, subscriptionTypes } from "../../constants/constants.js";

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { is: emailRegex },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 6,
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: subscriptionTypes,
    defaultValue: "starter",
    validate: {
      isIn: [[...subscriptionTypes]],
    },
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// User.sync();

export default User;
