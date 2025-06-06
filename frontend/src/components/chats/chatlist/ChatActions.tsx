import axios from "axios";
import { useState } from "react";

enum ActionStates {
    Base,
    Create,
    Join,
}

const ChatActions = () => {
    const [action, setAction] = useState<ActionStates>(ActionStates.Base);
    const [chatName, setChatName] = useState<string>("");
    const [chatId, setChatId] = useState<string>("");

    const createChat = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { name: chatName };
        await axios
            .post(`${import.meta.env.VITE_API_URL}/chats`, data, { withCredentials: true })
            .then((result) => {
                console.log(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const joinChat = async (e: React.FormEvent<HTMLFormElement>) => {
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
                    <form onSubmit={createChat}>
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
                    <form onSubmit={joinChat}>
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
