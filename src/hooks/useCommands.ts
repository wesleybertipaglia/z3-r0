import { useTranslation } from "react-i18next";
import { useMedia } from "./useMedia";
import { ContentType, MessageType } from "../types/message";

type CommandResult = { content: ContentType; type?: MessageType };

export function useCommands() {
    const { t } = useTranslation();
    const { randomMeme, randomGif, randomTrack } = useMedia();

    const getRandom = (items: string[]) => items[Math.floor(Math.random() * items.length)];

    const commands: Record<string, () => CommandResult> = {
        "!meme": () => ({ content: randomMeme(), type: "image" }),
        "!gif": () => ({ content: randomGif(), type: "image" }),
        "!advice": () => ({ content: getRandom(t("advices", { returnObjects: true }) as string[]) }),
        "!compliment": () => ({ content: getRandom(t("compliments", { returnObjects: true }) as string[]), type: "pre" }),
        "!joke": () => ({ content: getRandom(t("jokes", { returnObjects: true }) as string[]) }),
        "!funfact": () => ({ content: getRandom(t("funfacts", { returnObjects: true }) as string[]) }),
        "!quote": () => ({ content: getRandom(t("quotes", { returnObjects: true }) as string[]), type: "code" }),
        "!bug": () => ({ content: getRandom(t("bugs", { returnObjects: true }) as string[]), type: "glitch" }),
        "!debug": () => ({ content: getRandom(t("debug", { returnObjects: true }) as string[]), type: "glitch" }),
        "!about": () => ({ content: getRandom(t("about", { returnObjects: true }) as string[]) }),
        "!music": () => ({
            content: `<iframe src="${randomTrack()}?utm_source=generator&theme=0" width="100%" height="80" frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"></iframe>`,
            type: "html"
        }),
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
        [t("commands.!about")]: "!about",
        [t("commands.!music")]: "!music",
    };

    function resolveCommand(input: string): CommandResult | undefined {
        const normalized = input.trim().toLowerCase();
        const resolved = commandTranslations[normalized] || normalized;

        if (!resolved.startsWith("!")) return undefined;
        return commands[resolved]?.() ?? { content: t("ui.unknown_command"), type: "text" };
    }

    return { resolveCommand };
}
