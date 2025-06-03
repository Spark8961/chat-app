import express from "express";
import { getUserChats } from "../controllers/chats/index.js";
import { verifyAuth } from "../middleware/index.js";

export const chatRouter = express.Router();

chatRouter.get("/", verifyAuth, getUserChats);
