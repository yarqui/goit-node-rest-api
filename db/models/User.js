import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import { emailRegex, subscriptionTypes } from "../../constants/constants.js";

const User = sequelize.define("user", {
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
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
  },
  avatarURL: { type: DataTypes.STRING },
});

// User.sync({ force: true });

export default User;
