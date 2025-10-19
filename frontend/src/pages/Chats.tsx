import axios from "axios";
import ChatList from "../components/chats/ChatList";
import ChatContent from "../components/chats/ChatContent";
import { useQueryClient } from "@tanstack/react-query";

const Chats = () => {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["user"]);

    const handleLogout = async () => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
        if (result.status === 200) {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    };

    return (
        <div>
            <div>
                <p>Welcome {user?.name}.</p>
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleLogout}>
                    Sign Out
                </button>
            </div>
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <div style={{ width: "45%" }}>
                    <ChatList />
                </div>
                <div style={{ width: "45%" }}>
                    <ChatContent />
                </div>
            </div>
        </div>
    );
};

export default Chats;
