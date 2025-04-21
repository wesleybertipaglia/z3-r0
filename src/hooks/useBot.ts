import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ContentType, MessageType } from "../types/message";
import { useMedia } from "./useMedia";
import { useMessage } from "./useMessage";

let msgId = 0;

export function useBot() {
    const { t } = useTranslation();
    const { randomMeme, randomGif } = useMedia();
    const { messages, addMessage, initialized } = useMessage();
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
        const response = handleCommand(input.trim().toLowerCase());

        setIsTyping(true);

        setTimeout(() => {
            addMessage({ id: msgId++, from: "bot", content: response.content, type: response.type as MessageType });
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
            "!compliment": () => ({ content: getRandom(t("compliments", { returnObjects: true }) as string[]), type: "pre" }),
            "!joke": () => ({ content: getRandom(t("jokes", { returnObjects: true }) as string[]) }),
            "!funfact": () => ({ content: getRandom(t("funfacts", { returnObjects: true }) as string[]) }),
            "!quote": () => ({ content: getRandom(t("quotes", { returnObjects: true }) as string[]), type: "code" }),
            "!bug": () => ({ content: getRandom(t("bugs", { returnObjects: true }) as string[]), type: "glitch" }),
            "!debug": () => ({ content: getRandom(t("debug", { returnObjects: true }) as string[]) }),
            "!about": () => ({ content: getRandom(t("about", { returnObjects: true }) as string[]) }),
            "!help": () => ({
                content: (t("commands_list", { returnObjects: true }) as string[]).join("\n"),
                type: "pre"
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
            [t("commands.!about")]: "!about"
        };

        const resolved = commandTranslations[normalized] || normalized;

        if (!resolved.startsWith("!")) {
            return { content: t("interaction.not_understood"), type: "text" };
        }

        return commands[resolved]?.() ?? { content: t("interaction.unknown_command"), type: "text" };
    }

    return { messages, onUserMessage, isTyping };
}
