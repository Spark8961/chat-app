import { User, DM, IDM } from "../models/index";
import { toObjectId } from "../utils/idConverters";

type CreateResult = { existed: boolean; dm: IDM } | null;

export const createDM = async (userId: string, otherUserId: string): Promise<CreateResult | null> => {
    try {
        const exists = await DM.findOne({ users: { $all: [userId, otherUserId] } });
        if (exists) return { existed: true, dm: exists.toObject() };

        const dm = new DM({ users: [toObjectId(userId), toObjectId(otherUserId)] });
        const document = await dm.save();
        await User.updateMany({ _id: { $in: [userId, otherUserId] } }, { $push: { dms: document._id } });
        return { existed: true, dm: document.toObject() };
    } catch (err) {
        console.log(err);
        return null;
    }
};
