import { Request, Response } from "express";
import { Types } from "mongoose";
import { findUserByID, createDM } from "../services/index";

export const createDMController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "User ID missing from token" });
            return;
        }

        const otherUserId = req.body.userId;
        if (!Types.ObjectId.isValid(otherUserId)) {
            res.status(400).json({ error: "Invalid user ID" });
            return;
        }

        const otherUser = await findUserByID(otherUserId);
        if (!otherUser) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const createdDM = await createDM(userId, otherUserId);
        if (!createdDM) {
            res.status(500).json({ error: "Could not create chat" });
            return;
        }

        if (createdDM.existed) {
            res.status(409).json({ error: "DM already exists with that user." });
            return;
        }

        res.status(200).json(createdDM);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
        return;
    }
};
