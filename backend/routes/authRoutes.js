import express from "express";
import { register, login, logout, verifyMe } from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";
import { validatePayload } from "../middleware/payloadValidator.js";
import { verifyAuth } from "../middleware/verfiyAuth.js";

const router = express.Router();

router.post("/register", validatePayload(registerValidator), register);
router.post("/login", validatePayload(loginValidator), login);
router.post("/logout", verifyAuth, logout);
router.get("/me", verifyAuth, verifyMe);

export default router;
