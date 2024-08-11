import express from "express";
import ctrl from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import authSchemas from "../schemas/authSchemas.js";

const authRouter = express.Router();
const authMiddleware = validateBody(authSchemas.authSchema);

authRouter.post("/signup", authMiddleware, ctrl.signup);
authRouter.post("/signin", authMiddleware, ctrl.signin);
authRouter.post("/signout", ctrl.signup);

export default authRouter;
