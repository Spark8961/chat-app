import axios from "axios";
import { useEffect, useState } from "react";
import NoChats from "./chatlist/NoChats";

const ChatList = () => {
    const [data, setData] = useState<any>();

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
            {data.length === 0 ? <NoChats /> : <span>uwu</span>}
        </div>
    );
};

export default ChatList;
