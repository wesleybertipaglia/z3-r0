import { useEffect, useState } from "react";
import { MessageDto } from "../types/message";

const STORAGE_KEY = "chat_messages";

export function useMessage() {
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setMessages(JSON.parse(stored));
        }
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (initialized) {
            const trimmed = messages.slice(-20);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
        }
    }, [messages, initialized]);

    function addMessage(message: MessageDto) {
        setMessages((prev) => [...prev, message]);
    }

    return { messages, addMessage, initialized };
}
