import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: String,
    sender: [mongoose.Schema.Types.ObjectId],
    chat: [mongoose.Schema.Types.ObjectId],
    sentAt: { type: Date, default: Date.now() },
});

export const Message = mongoose.model("Message", messageSchema);
