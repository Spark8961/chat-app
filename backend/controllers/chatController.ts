import { Request, Response } from "express";
import { Types } from "mongoose";
import { getChats, findUserByID, createChat, joinChat } from "../services/index";

export const getChatsController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "User ID missing from token" });
            return;
        }

        const chatList = await getChats(userId);
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
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "User ID missing from token" });
            return;
        }

        const user = await findUserByID(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const chatName = req.body.name;
        const createdChat = await createChat(userId, chatName);
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

export const joinChatController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "User ID missing from token" });
            return;
        }

        const user = await findUserByID(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const chatId = req.body.chat_id;
        if (!Types.ObjectId.isValid(chatId)) {
            res.status(400).json({ error: "Invalid chat ID" });
            return;
        }

        const joinedChat = await joinChat(userId, chatId);
        if (!joinedChat) {
            res.status(500).json({ error: "Could not join chat" });
            return;
        }

        res.status(200).json(joinedChat);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
        return;
    }
};
