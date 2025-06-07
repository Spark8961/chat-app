import { User, Chat, IChat } from "../models/index";
import { toObjectId } from "../utils/idConverters";

export const getChats = async (userId: string): Promise<IChat[] | null> => {
    try {
        const chats = await User.findById(toObjectId(userId), { chats: 1, _id: 0 }).lean();
        if (!chats) return null;

        const chatData = await Chat.find({ _id: { $in: chats.chats } }, { name: 1 }).lean();
        return chatData;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const createChat = async (userId: string, chatName: string): Promise<IChat | null> => {
    try {
        const chat = new Chat({ name: chatName, users: [toObjectId(userId)], owner: toObjectId(userId) });
        const document = await chat.save();
        await User.updateOne({ _id: toObjectId(userId) }, { $push: { chats: document._id } });
        return document.toObject() as IChat;
    } catch (err) {
        console.log(err);
        return null;
    }
};

type UserJoined = {
    user_id: string;
    chat_id: string;
};

export const joinChat = async (userId: string, chatId: string): Promise<UserJoined | null> => {
    try {
        await User.updateOne({ _id: toObjectId(userId) }, { $push: { chats: toObjectId(chatId) } });
        await Chat.updateOne({ _id: toObjectId(chatId) }, { $push: { users: toObjectId(userId) } });
        return { user_id: userId, chat_id: chatId };
    } catch (err) {
        console.log(err);
        return null;
    }
};
