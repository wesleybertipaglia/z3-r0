import { useState, useEffect, useCallback, useRef } from "react";
import { From, MessageDto, MessageType } from "../../types/message";
import { nanoid } from "nanoid";
import { useNotification } from "../core/useNotification";
import { useTranslation } from "react-i18next";
import { useRandom } from "../media/useRandom";
import { useInactivity } from "../core/useInactivity";

const STORAGE_KEY = "messages";
const MAX_MESSAGES = 50;

export function useMessage() {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const { getRandomType, getCompleteRandomSentence, getRandomGif, getRandomMeme, getRandomMusic, getRandomSentence } = useRandom();
    const { sendNotification } = useNotification();
    const loaded = useRef(false)

    // 💾 Local storage logic
    useEffect(() => {
        if (!loaded.current){
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setMessages(JSON.parse(stored));
            }
            loaded.current = true
        }
    }, []);

    useEffect(() => {
        const trimmed = messages.slice(-MAX_MESSAGES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    }, [messages]);

    // 💬 Message handler
    const addMessage = useCallback((message: MessageDto) => {        
        setMessages((prev) => [...prev, message]);

        if (message.from === "bot") {
            sendNotification(t("ui.notification"), {
                body: typeof message.content === "string" ? message.content : undefined,
                icon: "/profile.webp",
            });
        }
    },[sendNotification, t])

    const send = useCallback(({
        from, content, type, style,
    }: {
        from: From; content: string; type?: MessageType; style?: string;
    }) => {
        addMessage({ id: nanoid(), from, content, type, style });
    },[addMessage]);

    // 🔄 Random message handler
    const sendRandomMessage = useCallback(() => {
        const randomType = getRandomType();

        switch (randomType) {
            case "text":
                send({ from: "bot", content: getCompleteRandomSentence(), type: "text" });
                break;
            case "image": {
                const gifOrMeme = Math.random() < 0.5 ? getRandomMeme() : getRandomGif();
                send({ from: "bot", content: gifOrMeme, type: "image" });
                break;
            }
            case "audio":
                send({ from: "bot", content: getCompleteRandomSentence(), type: "audio" });
                break;
            case "music":
                send({ from: "bot", content: getRandomMusic(), type: "music" });
                break;
            default:
                send({ from: "bot", content: getCompleteRandomSentence(), type: "text" });
                break;
        }        
    },[send, getRandomType, getCompleteRandomSentence, getRandomGif, getRandomMeme, getRandomMusic])

    // 👋 Welcome message logic
    useEffect(() => {
        if (messages.length == 0)
        {
            send({ from: "bot", content: getRandomSentence("welcome"), type: "info" });
        }
    }, [])

    // 💤 Inactivity message logic
    useInactivity(sendRandomMessage);

    return { messages, send, sendRandomMessage };
}
