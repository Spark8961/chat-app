import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

enum ActionStates {
    Base,
    Create,
    Join,
}

const createChat = async (name: string) => {
    const data = { name: name };
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/chats`, data, { withCredentials: true });
    return result;
};

const ChatActions = () => {
    const [action, setAction] = useState<ActionStates>(ActionStates.Base);
    const [chatName, setChatName] = useState<string>("");
    const [chatId, setChatId] = useState<string>("");
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
            setChatName("");
            setAction(ActionStates.Base);
        },
    });

    const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createMutation.mutate(chatName);
    };

    const handleJoinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    let content;
    switch (action) {
        case ActionStates.Base:
            content = (
                <div>
                    <button onClick={() => setAction(ActionStates.Create)}>create</button> or <button onClick={() => setAction(ActionStates.Join)}>join</button>
                </div>
            );
            break;
        case ActionStates.Create:
            content = (
                <div>
                    <div>Create Chat</div>
                    <form onSubmit={handleCreateSubmit}>
                        <div>
                            <label htmlFor="chatName">Chat Name:</label>
                            <input className="input" type="text" name="chatName" id="chatName" value={chatName} onChange={(e) => setChatName(e.target.value)} />
                        </div>
                        <span>
                            <button className="btn btn-primary self-start" type="submit">
                                Create
                            </button>
                            <button className="btn btn-primary self-start" type="button" onClick={() => setAction(ActionStates.Base)}>
                                Back
                            </button>
                        </span>
                    </form>
                </div>
            );
            break;
        case ActionStates.Join:
            content = (
                <div>
                    <div>Join Chat</div>
                    <form onSubmit={handleJoinSubmit}>
                        <div>
                            <label htmlFor="chatId">Chat ID:</label>
                            <input className="input" type="text" name="chatId" id="chatId" value={chatId} onChange={(e) => setChatId(e.target.value)} />
                        </div>
                        <span>
                            <button className="btn btn-primary self-start" type="submit">
                                Create
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
