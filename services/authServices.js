import User from "../db/models/User.js";
import bcrypt from "bcrypt";

const findUser = (query) => User.findOne({ where: query });

const updateUser = async (query, data) => {
  const user = await findUser(query);
  if (!user) {
    return null;
  }

  return user.update(data, { returning: true });
};

const signup = async (data) => {
  try {
    const { password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...data, password: hashedPassword });

    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email already in use";
    }
    console.log("error:", error);
    throw error;
  }
};

export default { findUser, updateUser, signup };
