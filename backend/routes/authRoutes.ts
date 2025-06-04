import express from "express";

import { register, login, logout, verifyMe } from "../controllers/authController";
import { registerValidator, loginValidator } from "../validators/index";
import { validateRequestData, verifyAuth } from "../middleware/index";

export const authRouter = express.Router();

authRouter.post("/register", validateRequestData(registerValidator), register);
authRouter.post("/login", validateRequestData(loginValidator), login);
authRouter.post("/logout", verifyAuth, logout);
authRouter.get("/me", verifyAuth, verifyMe);
