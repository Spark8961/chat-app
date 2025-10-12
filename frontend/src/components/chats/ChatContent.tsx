import React, { useState, useRef, useEffect, KeyboardEvent, CSSProperties } from "react";

interface Message {
    id: number;
    text: string;
}

const ChatContent: React.FC = () => {
    const dummyMessages: Message[] = [
        { id: 1, text: "Hey there!" },
        { id: 2, text: "How's it going?" },
        { id: 3, text: "Just testing this chat layout." },
        {
            id: 4,
            text: "This message is long enough to make sure scrolling works properly when there's overflow.",
        },
        { id: 5, text: "Yup, visible scrollbar now." },
        { id: 6, text: "Add a few more messages..." },
        { id: 7, text: "To see vertical scrolling in action." },
        { id: 8, text: "This one might require scrolling." },
        { id: 9, text: "Another one just for testing." },
    ];

    const [messages, setMessages] = useState<Message[]>(dummyMessages);
    const [text, setText] = useState("");
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const send = () => {
        if (!text.trim()) return;
        setMessages((m) => [...m, { id: Date.now(), text: text.trim() }]);
        setText("");
        inputRef.current?.focus();
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    // Scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // --- Styles ---
    const containerStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 300,
        boxSizing: "border-box",
    };

    const messagesWrapperStyle: CSSProperties = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll", // 👈 always show scrollbar
        scrollBehavior: "smooth",
        paddingRight: 6,
    };

    const messageStyle: CSSProperties = {
        wordBreak: "break-word",
        padding: "6px 8px",
        borderRadius: 6,
        border: "1px solid rgba(0,0,0,0.1)",
        marginBottom: 4,
    };

    const inputRowStyle: CSSProperties = {
        display: "flex",
        gap: 8,
        alignItems: "center",
        borderTop: "1px solid rgba(0,0,0,0.1)",
        paddingTop: 8,
        marginTop: 4,
    };

    const inputStyle: CSSProperties = {
        flex: 1,
        padding: "8px 10px",
        resize: "none",
    };

    const buttonStyle: CSSProperties = {
        padding: "8px 12px",
    };

    return (
        <div style={containerStyle}>
            <div style={messagesWrapperStyle}>
                {messages.map((m) => (
                    <div key={m.id} style={messageStyle}>
                        {m.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div style={inputRowStyle}>
                <textarea ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={onKeyDown} placeholder="Type a message and press Enter" rows={1} style={inputStyle} />
                <button onClick={send} style={buttonStyle}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatContent;
