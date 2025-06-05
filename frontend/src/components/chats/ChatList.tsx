import axios from "axios";
import { useEffect, useState } from "react";
import ChatActions from "./chatlist/ChatActions";
import YesChats from "./chatlist/YesChats";

type ChatListData = {
    _id: string;
    name: string;
};

const ChatList = () => {
    const [data, setData] = useState<ChatListData[]>();

    useEffect(() => {
        const fetchChats = async () => {
            await axios
                .get(`${import.meta.env.VITE_API_URL}/chats`, { withCredentials: true })
                .then((res) => {
                    setData(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        fetchChats();
    }, []);
    return (
        <div className="container">
            <div>Chat list</div>
            {data?.length === 0 ? (
                <div>
                    <p>No chats found, create or join one:</p>
                    <ChatActions />
                </div>
            ) : (
                <div>
                    {data?.map((element) => (
                        <YesChats key={element._id} name={element.name} />
                    ))}
                    <ChatActions />
                </div>
            )}
        </div>
    );
};

export default ChatList;
