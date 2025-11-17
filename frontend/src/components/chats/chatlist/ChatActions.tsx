import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { api } from "../../../api";

enum ActionStates {
    Base,
    AddDM,
}

const AddDM = async (id: string) => {
    const data = { user_id: id };
    const result = await api.post("/chats/join/dm", data, { withCredentials: true });
    return result;
};

const ChatActions = () => {
    const [action, setAction] = useState<ActionStates>(ActionStates.Base);
    const [userId, setUserId] = useState<string>("");
    const queryClient = useQueryClient();

    const joinMutation = useMutation({
        mutationFn: AddDM,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
            setUserId("");
            setAction(ActionStates.Base);
        },
    });

    const handleJoinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        joinMutation.mutate(userId);
    };

    let content;
    switch (action) {
        case ActionStates.Base:
            content = (
                <div>
                    <button onClick={() => setAction(ActionStates.AddDM)}>add</button>
                </div>
            );
            break;
        case ActionStates.AddDM:
            content = (
                <div>
                    <div>Join Chat</div>
                    <form onSubmit={handleJoinSubmit}>
                        <div>
                            <label htmlFor="chatId">User ID:</label>
                            <input className="input" type="text" name="userId" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
                        </div>
                        <span>
                            <button className="btn btn-primary self-start" type="submit">
                                Join
                            </button>
                            <button className="btn btn-primary self-start" type="button" onClick={() => setAction(ActionStates.Base)}>
                                Back
                            </button>
                        </span>
                    </form>
                </div>
            );
            break;
    }

    return <>{content}</>;
};

export default ChatActions;
