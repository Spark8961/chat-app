import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import ChatList from "../components/chats/ChatList";
import ChatContent from "../components/chats/ChatContent";

const Chats = () => {
    const { user, setUser, setIsAuthenticated } = useContext(AuthContext)!;

    const handleLogout = async () => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
        if (result.status === 200) {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    return (
        <div>
            <div>
                <p>Welcome {user?.username}.</p>
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
