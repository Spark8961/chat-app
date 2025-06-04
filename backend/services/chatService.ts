import { User, Chat, IChat } from "../models/index";

export const getChats = async (userID: string): Promise<IChat[] | null> => {
    const chats = await User.findById(userID, { chats: 1, _id: 0 }).lean();
    if (!chats) return null;

    const chatData = await Chat.find({ _id: { $in: chats.chats } }, { name: 1 }).lean();
    return chatData;
};
