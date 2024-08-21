import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

import User from "../db/models/User.js";
import sendEmail from "../helpers/sendEmail.js";

const { BASE_URL } = process.env;

const findUser = (query) => User.findOne({ where: query });

const updateUser = async (query, data) => {
  const user = await findUser(query);
  if (!user) {
    return null;
  }

  return user.update(data, { returning: true });
};

const sendVerifyEmail = (email, verificationToken) => {
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };

  return sendEmail(verifyEmail);
};

const signup = async (data) => {
  try {
    const { email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email, { s: "400", protocol: "https" });
    const newUser = await User.create({
      ...data,
      avatarURL,
      password: hashedPassword,
      verificationToken,
    });

    await sendVerifyEmail(email, verificationToken);

    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email already in use";
    }
    console.log("error:", error);
    throw error;
  }
};

export default { findUser, updateUser, signup, sendVerifyEmail };
