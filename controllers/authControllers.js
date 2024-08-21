import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import authServices from "../services/authServices.js";

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

  if (!user.verified) {
    throw HttpError(403, "You need to verify your email first");
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
  const { id } = req.user;
  await authServices.updateUser({ id }, { token: "" });
  return res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const updateUserSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  if (!subscription) {
    throw HttpError(400);
  }

  const user = await authServices.updateUser({ id }, { subscription });
  if (!user) {
    throw HttpError(404);
  }
  res.json({ email: user.email, subscription: user.subscription });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);

  const user = await authServices.findUser({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found or already verified");
  }

  await authServices.updateUser(
    { verificationToken },
    {
      verified: true,
      verificationToken: null,
    }
  );

  res.status(200).json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }
  if (user.verified) {
    throw HttpError(400, "Verification has already been passed");
  }

  await authServices.sendVerifyEmail(user.email, user.verificationToken);

  res.json({
    message: "Verification email sent",
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  getCurrent: ctrlWrapper(getCurrent),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
