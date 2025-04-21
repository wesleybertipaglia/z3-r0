import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Message, ContentType, MessageType } from "../types/message";

let msgId = 0;

export function useBot() {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    function sendUserMessage(text: string) {
        addMessage({ from: "user", content: text });
        handleBotResponse(text);
    }

    function addMessage(msg: Omit<Message, "id">) {
        setMessages((prev) => [...prev, { id: msgId++, ...msg }]);
    }

    function handleBotResponse(input: string) {
        const response = handleCommand(input.trim().toLowerCase());

        setIsTyping(true);

        setTimeout(() => {
            addMessage({ from: "bot", content: response.content, type: response.type as MessageType });
            setIsTyping(false);
        }, 1200);
    }

    function handleCommand(input: string) {
        const normalized = input.trim().toLowerCase();

        const commands: Record<string, () => { content: ContentType; type?: MessageType }> = {
            "!meme": () => ({ content: t("meme"), type: "image" }),
            "!bug": () => ({ content: t("bug"), type: "glitch" }),
            "!advice": () => ({ content: t("advice") }),
            "!compliment": () => ({ content: t("compliment") }),
        };

        const commandTranslations: Record<string, string> = {
            [t("commands.!meme")]: "!meme",
            [t("commands.!bug")]: "!bug",
            [t("commands.!advice")]: "!advice",
            [t("commands.!compliment")]: "!compliment",
        };

        const resolved = commandTranslations[normalized] || normalized;

        if (!resolved.startsWith("!")) {
            return { content: t("interaction.not_understood"), type: "text" };
        }

        return commands[resolved]?.() ?? { content: t("interaction.unknown_command"), type: "text" };
    }

    return { messages, sendUserMessage, isTyping };
}
