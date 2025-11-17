import axios from "axios";
import ChatActions from "./chatlist/ChatActions";
import YesChats from "./chatlist/YesChats";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";

type ChatListData = {
    _id: string;
    name: string;
};

const fetchChats = async (): Promise<ChatListData[]> => {
    const res = await api.get("/chats", { withCredentials: true });
    return res.data;
};
const ChatList = () => {
    const { data, isLoading, isError } = useQuery({ queryKey: ["chats"], queryFn: fetchChats });

    if (isLoading) return <p>Loading</p>;
    if (isError) return <p>Error</p>;

    return (
        <div className="container">
            <div>Chat list</div>
            {data?.length === 0 ? (
                <div>
                    <p>No chats found, add user to join with by id:</p>
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
