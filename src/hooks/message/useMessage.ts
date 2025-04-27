import { useState, useEffect } from "react";
import { From, MessageDto, MessageType } from "../../types/message";
import { nanoid } from "nanoid";
import { useNotification } from "../core/useNotification";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "messages";
const MAX_MESSAGES = 50;

export function useMessage() {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [initialized, setInitialized] = useState(false);
    const { sendNotification } = useNotification();

    // 💾 Local Storage Logic
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setMessages(JSON.parse(stored));
        }
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (initialized) {
            const trimmed = messages.slice(-MAX_MESSAGES);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
        }
    }, [messages, initialized]);

    // 💬 Message Handler
    function addMessage(message: MessageDto) {
        setMessages((prev) => [...prev, message]);

        if (message.from === "bot") {
            sendNotification(t("ui.notification"), {
                body: typeof message.content === "string" ? message.content : undefined,
                icon: "/profile.webp",
            });
        }
    }

    function send({ from, content, type, style, }: { from: From; content: string; type?: MessageType; style?: string; }) {
        addMessage({ id: nanoid(), from, content, type, style, });
    }

    // 🗑️ Clear Messages
    function clear() {
        setMessages([]);
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    }

    return { initialized, messages, send, clear };
}