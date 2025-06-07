import express from "express";

import { getChatsController, createChatsController, joinChatController } from "../controllers/chatController";
import { verifyAuth, validateRequestData } from "../middleware/index";
import { createValidator, joinValidator } from "../validators/index";

export const chatRouter = express.Router();

chatRouter.get("/", verifyAuth, getChatsController);
chatRouter.post("/", verifyAuth, validateRequestData(createValidator), createChatsController);
chatRouter.post("/join", verifyAuth, validateRequestData(joinValidator), joinChatController);
