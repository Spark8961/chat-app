import express from "express";

import { getUserChats } from "../controllers/chatController";
import { verifyAuth } from "../middleware/index";

export const chatRouter = express.Router();

chatRouter.get("/", verifyAuth, getUserChats);
