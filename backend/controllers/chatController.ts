import { Request, Response } from "express";
import { getChats, findUserByID, createChat } from "../services/index";

export const getChatsController = async (req: Request, res: Response) => {
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

export const createChatsController = async (req: Request, res: Response) => {
    try {
        const userID = req.user?.userId;
        if (!userID) {
            res.status(401).json({ error: "User ID missing from token" });
            return;
        }

        const user = await findUserByID(userID);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const chatName = req.body.name;
        const createdChat = await createChat(userID, chatName);
        if (!createdChat) {
            res.status(500).json({ error: "Could not create chat" });
            return;
        }

        res.status(200).json(createdChat);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
        return;
    }
};
