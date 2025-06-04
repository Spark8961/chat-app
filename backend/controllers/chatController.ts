import { Request, Response } from "express";

import { Chat, User } from "../models/index";
import { getChats } from "../services/index";

export const getUserChats = async (req: Request, res: Response) => {
    try {
        const userID = req.user?.userId;
        if (!userID) {
            res.status(401).json({ error: "User ID missing from token" });
            return;
        }

        const chatList = await getChats(userID);
        if (!chatList) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json(chatList);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
        return;
    }
};
