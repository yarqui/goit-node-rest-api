import express from "express";
import ctrl from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import authSchemas from "../schemas/authSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();
const authMiddleware = validateBody(authSchemas.authSchema);
const authUpdateSubscriptionMiddleware = validateBody(
  authSchemas.updateSubscriptionSchema
);

authRouter.post("/signup", authMiddleware, ctrl.signup);
authRouter.post("/signin", authMiddleware, ctrl.signin);
authRouter.post("/signout", authenticate, ctrl.signout);
authRouter.get("/current", authenticate, ctrl.getCurrent);
authRouter.patch(
  "/subscription",
  authUpdateSubscriptionMiddleware,
  authenticate,
  ctrl.updateUserSubscription
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateUserAvatar
);

export default authRouter;
