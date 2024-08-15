import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import authServices from "../services/authServices.js";

const { JWT_SECRET } = process.env;

export const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized. Authorization header missing"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized. Bearer missing"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await authServices.findUser({ id });
    if (!user) {
      return next(HttpError(401, "Not authorized. User not found"));
    }
    if (!user.token || user.token !== token) {
      return next(HttpError(401, "Not authorized. Invalid token"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};
