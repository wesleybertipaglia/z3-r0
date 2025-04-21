import { useEffect, useState } from "react";
import { MessageDto } from "../types/message";

const STORAGE_KEY = "chat-messages";
const MAX_MESSAGES = 20;

export function useMessages() {
    const [messages, setMessages] = useState<MessageDto[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setMessages(parsed);
            } catch {
                console.warn("Failed to parse messages from localStorage.");
            }
        }
    }, []);

    const addMessage = (msg: MessageDto) => {
        setMessages(prev => {
            const updated = [...prev, msg].slice(-MAX_MESSAGES);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    return {
        messages,
        setMessages,
        addMessage,
    };
}
