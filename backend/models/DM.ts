import mongoose, { InferSchemaType, Types } from "mongoose";

const DMSchema = new mongoose.Schema({
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: true,
        validate: {
            validator: (v: Types.ObjectId[]) => Array.isArray(v) && v.length === 2,
            message: "DM must have exactly two users.",
        },
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        },
    ],
});

DMSchema.index({ users: 1 });
DMSchema.set("toObject", {
    versionKey: false,
    virtuals: false,
    getters: false,
});

export const DM = mongoose.model("DM", DMSchema);
export type IDM = InferSchemaType<typeof DMSchema> & { _id: Types.ObjectId };
