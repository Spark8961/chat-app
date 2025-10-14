import { useEffect, useRef, useState } from "react";

const ChatContent = () => {
    const [messages, setMessages] = useState<string[]>([
        "Hello!",
        "Welcome to the chat.",
        "This is a demo message."
    ]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Demo function to simulate receiving a new message
    const addMessage = () => {
        setMessages((prev) => [...prev, `New message ${prev.length + 1}`]);
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-50 p-4 min-h-screen">
            <h2 className="text-xl font-semibold mb-4">Chat Content</h2>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                {messages.map((msg, idx) => (
                    <div key={idx} className="p-2 bg-white rounded shadow">
                        {msg}
                    </div>
                ))}
                {/* Dummy div to scroll into view */}
                <div ref={messagesEndRef} />
            </div>

            {/* Demo button to add new messages */}
            <button
                className="btn btn-primary self-end"
                onClick={addMessage}
            >
                Add Message
            </button>
        </div>
    );
};

export default ChatContent;
