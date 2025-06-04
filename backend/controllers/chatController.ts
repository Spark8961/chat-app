import { Request, Response } from "express";

import { Chat, User } from "../models/index";

export const getUserChats = async (req: Request, res: Response) => {
    try {
        const userID = req;
        if (!userID) {
            res.status(401).json({ error: "User ID missing from token" });
            return;
        }

        const chatIds = await User.findById(userID, { chats: 1, _id: 0 });
        if (!chatIds) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const chatData = await Chat.find({ _id: { $in: chatIds.chats } }, { name: 1 });
        res.status(200).json(chatData);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
        return;
    }
};
