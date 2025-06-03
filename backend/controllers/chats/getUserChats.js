import { Chat, User } from "../../models/index.js";

export const getUserChats = async (req, res) => {
    try {
        const userID = req.user.userID;
        if (!userID) {
            return res.status(401).json({ error: "User ID missing from token" });
        }

        const chatIds = await User.findById(userID, { chats: 1, _id: 0 });
        if (!chatIds) {
            return res.status(404).json({ error: "User not found" });
        }
        const chatData = await Chat.find({ _id: { $in: chatIds.chats } }, { name: 1 });
        return res.status(200).json(chatData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error." });
    }
};
