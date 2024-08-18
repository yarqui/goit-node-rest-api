import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import path from "node:path";
import fs from "node:fs/promises";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import authServices from "../services/authServices.js";

const { JWT_SECRET } = process.env;
const avatarPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, subscription } = await authServices.signup(req.body);
  res.status(201).json({ user: { email, subscription } });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { id } = user;
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  const updatedUser = await authServices.updateUser({ id }, { token });

  res.json({
    token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

const signout = async (req, res) => {
  const { id } = req.user;
  await authServices.updateUser({ id }, { token: "" });
  return res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.status(200).json({ email, subscription, avatarURL });
};

const updateUserSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  if (!subscription) {
    throw HttpError(400);
  }

  const updatedUser = await authServices.updateUser({ id }, { subscription });
  if (!updatedUser) {
    throw HttpError(401);
  }
  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Missing the file to upload");
  }
  const { id, avatarURL: previousAvatarURL } = req.user;
  const { path: oldPath, filename } = req.file;

  const newAvatarURL = `/avatars/${filename}`;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);

  const updatedUser = await authServices.updateUser(
    { id },
    { avatarURL: newAvatarURL }
    // { avatarURL: newPath }
  );

  if (!updatedUser) {
    throw HttpError(401);
  }

  if (previousAvatarURL && !previousAvatarURL.startsWith("http")) {
    const previousAvatarPath = path.join(
      avatarPath,
      path.basename(previousAvatarURL)
    );
    
    try {
      await fs.unlink(previousAvatarPath);
    } catch (err) {
      console.error(`Error deleting previous avatar file: ${err.message}`);
    }
  }
  const { avatarURL } = updatedUser;

  res.json({ avatarURL });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  getCurrent: ctrlWrapper(getCurrent),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
};
