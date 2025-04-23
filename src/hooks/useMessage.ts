import { useState, useEffect } from "react";
import { useRandom } from "./useRandom";
import { MessageDto, MessageType } from "../types/message";

const STORAGE_KEY = "messages";

export function useMessage() {
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [initialized, setInitialized] = useState(false);
    const { getRandomType, getCompleteRandomSentence, getRandomGif, getRandomMeme, getRandomMusic } = useRandom();

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

    function message({ content, type, style }: { content: string, type: MessageType, style?: string }) {
        addMessage({
            id: Date.now(),
            from: "bot",
            content,
            type,
            style
        });
    }

    function sendRandomMessage() {
        const randomType = getRandomType();

        switch (randomType) {
            case "text": message({ content: getCompleteRandomSentence(), type: "text" })
                break;
            case "image": {
                const gifOrMeme = Math.random() < 0.5 ? getRandomMeme() : getRandomGif();
                message({ content: gifOrMeme, type: "image" });
                break;
            }
            case "audio":
                message({ content: getCompleteRandomSentence(), type: "audio" });
                break;
            case "component":
                message({ content: getRandomMusic(), type: "component" });
                break;
            default:
                message({ content: getCompleteRandomSentence(), type: "text" });
                break;
        }
    }

    return { messages, addMessage, initialized, sendRandomMessage };
}
