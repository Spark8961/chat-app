import express from "express";

import { createDMController } from "../controllers/chatController";
import { verifyAuth, validateRequestData } from "../middleware/index";
import { createDMValidator } from "../validators/index";

export const chatRouter = express.Router();

chatRouter.post("/join/dm", verifyAuth, validateRequestData(createDMValidator), createDMController);
