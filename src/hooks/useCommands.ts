import { useTranslation } from "react-i18next";
import { useRandom } from "./useRandom";
import { CommandResult } from "../types/command";

export function useCommands() {
    const { t } = useTranslation();
    const { getRandomMeme, getRandomGif, getRandomMusic, getRandomSentence } =
        useRandom();

    function help(): CommandResult {
        return {
            content: (t("commands_list", { returnObjects: true }) as string[]).join("\n"),
            style: "pre",
        };
    }

    const commands: Record<string, () => CommandResult> = {
        "!meme": () => ({ content: getRandomMeme(), type: "image" }),
        "!gif": () => ({ content: getRandomGif(), type: "image" }),
        "!advice": () => ({ content: getRandomSentence("advices"), type: "text", }),
        "!compliment": () => ({ content: getRandomSentence("compliments"), type: "text", }),
        "!joke": () => ({ content: getRandomSentence("jokes"), type: "text" }),
        "!funfact": () => ({ content: getRandomSentence("funfacts"), type: "text" }),
        "!quote": () => ({ content: getRandomSentence("quotes"), type: "text", style: "quote", }),
        "!bug": () => ({ content: getRandomSentence("bugs"), type: "text", style: "glitch", }),
        "!debug": () => ({ content: getRandomSentence("debug"), type: "text", style: "glitch", }),
        "!about": () => ({ content: getRandomSentence("about"), type: "text" }),
        "!music": () => ({ content: getRandomMusic(), type: "component" }),
        "!help": help,
        "!commands": help,
        "!cmds": help,
    };

    function resolveCommand(input: string): CommandResult | undefined {
        const normalized = input.trim().toLowerCase();
        if (!normalized.startsWith("!")) return undefined;
        const commandFn = commands[normalized];
        return commandFn ? commandFn() : { content: t("ui.unknown_command"), type: "text" };
    }

    return { resolveCommand };
}
