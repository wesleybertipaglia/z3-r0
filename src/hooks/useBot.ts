import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MessageType } from "../types/message";
import { useMessage } from "./useMessage";
import { useCommands } from "./useCommands";
import { useSound } from "./useSound";

let msgId = 0;

export function useBot() {
    const { t } = useTranslation();
    const { messages, addMessage, initialized, randomMessage } = useMessage();
    const { resolveCommand } = useCommands();
    const [isTyping, setIsTyping] = useState(false);
    const { play } = useSound();

    const lastInteractionRef = useRef(Date.now());

    // 🟢 Welcome message
    useEffect(() => {
        if (!initialized || messages.length > 0) return;

        const welcomeMessages = t("welcome", { returnObjects: true }) as string[];
        const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        onBotMessage({ type: "info", content: randomWelcome });
    }, [initialized, t]);

    // 🕒 Inactivity logic
    useEffect(() => {
        if (!initialized) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = now - lastInteractionRef.current;

            if (diff >= 2 * 60 * 1000) { // 2 minutes
                randomMessage();
                lastInteractionRef.current = Date.now(); // reset after sending
            }
        }, 15000); // check every 15 seconds

        return () => clearInterval(interval);
    }, [initialized, randomMessage]);

    // ✉️ User message handler
    function onUserMessage(text: string) {
        lastInteractionRef.current = Date.now(); // 🔄 update interaction time
        addMessage({ id: msgId++, from: "user", content: text });
        const response = resolveCommand(text.trim());
        onBotMessage({ type: response.type as MessageType, content: response.content });
    }

    // 🤖 Bot message logic
    function onBotMessage({ type, content }: { type: MessageType; content: string }) {
        setIsTyping(true);
        setTimeout(() => {
            addMessage({ id: msgId++, from: "bot", content, type });
            setIsTyping(false);
            play("pop.mp3");
        }, 1200);
    }

    return { messages, onUserMessage, isTyping };
}
