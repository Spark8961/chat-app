import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, required: true },
    sentAt: { type: Date, default: Date.now(), required: true },
});

export const Message = mongoose.model("Message", messageSchema);
