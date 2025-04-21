import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMedia } from "./useMedia";
import { MessageDto } from "../types/message";

const STORAGE_KEY = "messages";

export function useMessage() {
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [initialized, setInitialized] = useState(false);
    const { t } = useTranslation();
    const { randomMeme, randomGif } = useMedia();

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

    function randomMessage() {
        const randomTextMessages = t("random", { returnObjects: true }) as string[];

        const randomMessageType = Math.floor(Math.random() * 4);
        const randomText = randomTextMessages[Math.floor(Math.random() * randomTextMessages.length)];

        switch (randomMessageType) {
            case 0:
                addMessage({ id: Date.now(), from: "bot", content: randomText, type: "text" });
                break;
            case 1:
                addMessage({ id: Date.now(), from: "bot", content: randomMeme(), type: "image" });
                break;
            case 2:
                addMessage({ id: Date.now(), from: "bot", content: randomGif(), type: "image" });
                break;
            case 4:
                addMessage({ id: Date.now(), from: "bot", content: randomText, type: "audio" });
                break;
        }
    }

    return { messages, addMessage, initialized, randomMessage };
}
