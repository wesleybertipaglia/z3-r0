import { useEffect, useState } from "react";
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

    useEffect(() => {
        if (!initialized) return;

        if (messages.length === 0) {
            const welcomeMessages = t("welcome", { returnObjects: true }) as string[];
            const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
            onBotMessage({ type: "info", content: randomWelcome });
        }

        const minInterval = 30000;
        const maxInterval = 60000;

        const randomInterval = Math.floor(Math.random() * (maxInterval - minInterval)) + minInterval;

        const interval = setInterval(() => {
            randomMessage();
        }, randomInterval);

        return () => clearInterval(interval);
    }, [initialized, t]);

    function onUserMessage(text: string) {
        addMessage({ id: msgId++, from: "user", content: text });
        const response = resolveCommand(text.trim());
        onBotMessage({ type: response.type as MessageType, content: response.content });
    }

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
