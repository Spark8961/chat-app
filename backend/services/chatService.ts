import { User, Chat, IChat } from "../models/index";

export const getChats = async (userID: string): Promise<IChat[] | null> => {
    try {
        const chats = await User.findById(userID, { chats: 1, _id: 0 }).lean();
        if (!chats) return null;

        const chatData = await Chat.find({ _id: { $in: chats.chats } }, { name: 1 }).lean();
        return chatData;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const createChat = async (userID: string, chatName: string): Promise<IChat | null> => {
    try {
        const chat = new Chat({ name: chatName, users: [userID], owner: userID });
        const document = await chat.save();
        await User.updateOne({ _id: userID }, { $push: { chats: document._id } });
        return document.toObject() as IChat;
    } catch (err) {
        console.log(err);
        return null;
    }
};
