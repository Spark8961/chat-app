import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    name: String,
    users: [mongoose.Schema.Types.ObjectId],
    owner: mongoose.Schema.Types.ObjectId,
    messages: [mongoose.Schema.Types.ObjectId],
});

export const Chat = mongoose.model("Chat", chatSchema);
