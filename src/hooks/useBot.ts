import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageType } from "../types/message";
import { useMessage } from "./useMessage";
import { useCommands } from "./useCommands";

let msgId = 0;

export function useBot() {
    const { t } = useTranslation();
    const { messages, addMessage, initialized } = useMessage();
    const { resolveCommand } = useCommands();
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!initialized) return;

        if (messages.length === 0) {
            const welcomeMessages = t("welcome", { returnObjects: true }) as string[];
            const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
            addMessage({ id: msgId++, from: "bot", content: randomWelcome, type: "info" });
        }
    }, [initialized, messages, t, addMessage]);

    function onUserMessage(text: string) {
        addMessage({ id: msgId++, from: "user", content: text });
        onBotMessage(text);
    }

    function onBotMessage(input: string) {
        const response = resolveCommand(input.trim());

        setIsTyping(true);
        setTimeout(() => {
            addMessage({ id: msgId++, from: "bot", content: response.content, type: response.type as MessageType });
            setIsTyping(false);
        }, 1200);
    }

    return { messages, onUserMessage, isTyping };
}
