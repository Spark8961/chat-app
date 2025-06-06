import express from "express";

import { registerController, loginController, logoutController, verifyController } from "../controllers/authController";
import { registerValidator, loginValidator } from "../validators/index";
import { validateRequestData, verifyAuth } from "../middleware/index";

export const authRouter = express.Router();

authRouter.post("/register", validateRequestData(registerValidator), registerController);
authRouter.post("/login", validateRequestData(loginValidator), loginController);
authRouter.post("/logout", verifyAuth, logoutController);
authRouter.get("/me", verifyAuth, verifyController);
