import jwt from "jsonwebtoken";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import authServices from "../services/authServices.js";
import bcrypt from "bcrypt";

const { JWT_SECRET } = process.env;
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
    user: { email: updatedUser.email, subscription: updatedUser.subscription },
  });
};
const signout = async (req, res) => {
  // TODO: FINISH
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
};
