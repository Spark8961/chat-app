import express from "express";
import { register, login, logout, verifyMe } from "../controllers/auth/index.js";
import { registerValidator, loginValidator } from "../validators/auth/index.js";
import { validateRequestData, verifyAuth } from "../middleware/index.js";

export const authRouter = express.Router();

authRouter.post("/register", validateRequestData(registerValidator), register);
authRouter.post("/login", validateRequestData(loginValidator), login);
authRouter.post("/logout", verifyAuth, logout);
authRouter.get("/me", verifyAuth, verifyMe);
