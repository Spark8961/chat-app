import express from "express";

import { getChatsController, createChatsController } from "../controllers/chatController";
import { verifyAuth, validateRequestData } from "../middleware/index";
import { createValidator } from "../validators/index";

export const chatRouter = express.Router();

chatRouter.get("/", verifyAuth, getChatsController);
chatRouter.post("/", verifyAuth, validateRequestData(createValidator), createChatsController);
