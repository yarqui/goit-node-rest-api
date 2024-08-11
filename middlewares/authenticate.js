import HttpError from "../helpers/HttpError";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorization header missing"));
  }
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer missing"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await finUser({ id });
    if (!user) {
      return next(HttpError(401, "User not found"));
    }
    //   TODO: finish this middleware
  } catch (error) {
    next(HttpError(401, error.message));
  }
};
