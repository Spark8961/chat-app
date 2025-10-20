import ChatList from "../components/chats/ChatList";
import ChatContent from "../components/chats/ChatContent";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { useUser } from "../hooks/useUser";

const Chats = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const result = await api.post("/auth/logout", {});
        if (result.status === 200) {
            queryClient.setQueryData(["user"], null);
        }
    };

    return (
        <div>
            <div>
                <p>Welcome {user}.</p>
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
