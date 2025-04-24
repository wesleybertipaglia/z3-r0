import { useState, useEffect } from "react";
import { useRandom } from "./useRandom";
import { From, MessageDto, MessageType } from "../types/message";
import { nanoid } from "nanoid";

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

    function send({ from, content, type, style }: { from: From, content: string, type?: MessageType, style?: string }) {
        addMessage({
            id: nanoid(),
            from,
            content,
            type,
            style
        });
    }

    function sendRandomMessage() {
        const randomType = getRandomType();

        switch (randomType) {
            case "text": send({ from: "bot", content: getCompleteRandomSentence(), type: "text" })
                break;
            case "image": {
                const gifOrMeme = Math.random() < 0.5 ? getRandomMeme() : getRandomGif();
                send({ from: "bot", content: gifOrMeme, type: "image" });
                break;
            }
            case "audio":
                send({ from: "bot", content: getCompleteRandomSentence(), type: "audio" });
                break;
            case "component":
                send({ from: "bot", content: getRandomMusic(), type: "component" });
                break;
            default:
                send({ from: "bot", content: getCompleteRandomSentence(), type: "text" });
                break;
        }
    }

    return { messages, send, initialized, sendRandomMessage };
}
