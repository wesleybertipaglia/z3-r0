import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageDto, ContentType, MessageType } from "../types/message";
import { useMedia } from "./useMedia";

let msgId = 0;

export function useBot() {
    const { t } = useTranslation();
    const { randomMeme, randomGif } = useMedia();
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    function sendUserMessage(text: string) {
        addMessage({ from: "user", content: text });
        handleBotResponse(text);
    }

    function addMessage(msg: Omit<MessageDto, "id">) {
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

        const getRandom = (items: string[]) => items[Math.floor(Math.random() * items.length)];

        const commands: Record<string, () => { content: ContentType; type?: MessageType }> = {
            "!meme": () => ({ content: randomMeme(), type: "image" }),
            "!gif": () => ({ content: randomGif(), type: "image" }),
            "!advice": () => ({ content: getRandom(t("advices", { returnObjects: true }) as string[]) }),
            "!compliment": () => ({ content: getRandom(t("compliments", { returnObjects: true }) as string[]) }),
            "!joke": () => ({ content: getRandom(t("jokes", { returnObjects: true }) as string[]) }),
            "!funfact": () => ({ content: getRandom(t("funfacts", { returnObjects: true }) as string[]) }),
            "!quote": () => ({ content: getRandom(t("quotes", { returnObjects: true }) as string[]) }),
            "!bug": () => ({ content: getRandom(t("bugs", { returnObjects: true }) as string[]), type: "glitch" }),
            "!debug": () => ({ content: getRandom(t("debug", { returnObjects: true }) as string[]) }),
            "!help": () => ({ content: getRandom(t("help", { returnObjects: true }) as string[]) }),
            "!about": () => ({ content: getRandom(t("about", { returnObjects: true }) as string[]) }),
            "!commands": () => ({
                content: (t("commands_list", { returnObjects: true }) as string[]).join("\n"),
                type: "text"
            })
        };

        const commandTranslations: Record<string, string> = {
            [t("commands.!meme")]: "!meme",
            [t("commands.!gif")]: "!gif",
            [t("commands.!advice")]: "!advice",
            [t("commands.!compliment")]: "!compliment",
            [t("commands.!joke")]: "!joke",
            [t("commands.!funfact")]: "!funfact",
            [t("commands.!quote")]: "!quote",
            [t("commands.!bug")]: "!bug",
            [t("commands.!debug")]: "!debug",
            [t("commands.!help")]: "!help",
            [t("commands.!about")]: "!about",
            [t("commands.!commands")]: "!commands"
        };

        const resolved = commandTranslations[normalized] || normalized;

        if (!resolved.startsWith("!")) {
            return { content: t("interaction.not_understood"), type: "text" };
        }

        return commands[resolved]?.() ?? { content: t("interaction.unknown_command"), type: "text" };
    }

    return { messages, sendUserMessage, isTyping };
}
