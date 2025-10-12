import React, { useState, useRef, KeyboardEvent, CSSProperties } from "react";

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
            text: "This message is longer so you can see how it gets clipped below the textbox when the container runs out of space.",
        },
        { id: 5, text: "Yup, works fine without scrolling." },
        { id: 6, text: "Another message for good measure." },
        { id: 7, text: "This one might get clipped if height is too small." },
        { id: 8, text: "Still here? Probably not visible if space ran out." },
    ];

    const [messages, setMessages] = useState<Message[]>(dummyMessages);
    const [text, setText] = useState("");
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

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

    // --- STYLES ---
    const containerStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 240,
        overflow: "hidden", // everything outside gets clipped
        boxSizing: "border-box",
        position: "relative", // to layer messages/input properly
    };

    const messagesWrapperStyle: CSSProperties = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden", // hide anything below container
    };

    const messageStyle: CSSProperties = {
        wordBreak: "break-word",
        padding: "6px 8px",
        borderRadius: 6,
        border: "1px solid rgba(0,0,0,0.08)",
        marginBottom: 4,
    };

    const inputRowStyle: CSSProperties = {
        display: "flex",
        gap: 8,
        alignItems: "center",
        position: "relative",
        zIndex: 2,
    };

    const inputStyle: CSSProperties = {
        flex: 1,
        padding: "8px 10px",
    };

    const buttonStyle: CSSProperties = {
        padding: "8px 12px",
    };

    return (
        <div style={containerStyle}>
            <div style={messagesWrapperStyle}>
                {messages.map((m) => (
                    <div key={m.id} title={m.text} style={messageStyle}>
                        {m.text}
                    </div>
                ))}
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
