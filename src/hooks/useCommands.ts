import { useTranslation } from "react-i18next";
import { useRandom } from "./useRandom";
import { CommandResult } from "../types/command";

export function useCommands() {
    const { t } = useTranslation();
    const { getRandomMeme, getRandomGif, getRandomMusic, getRandomSentence, getCompleteRandomSentence } =
        useRandom();

    function help(): CommandResult {
        return {
            content: (t("commands_list", { returnObjects: true }) as string[]).join("\n"),
            type: "code",
            style: "pre",
        };
    }

    const memeCommand = () => ({ content: getRandomMeme(), type: "image" });
    const gifCommand = () => ({ content: getRandomGif(), type: "image" });
    const adviceCommand = () => ({ content: getRandomSentence("advices"), type: "text" });
    const complimentCommand = () => ({ content: getRandomSentence("compliments"), type: "text" });
    const jokeCommand = () => ({ content: getRandomSentence("jokes"), type: "text" });
    const quoteCommand = () => ({ content: getRandomSentence("quotes"), type: "quote" });
    const funfactCommand = () => ({ content: getRandomSentence("funfacts"), type: "text" });
    const bugCommand = () => ({ content: getRandomSentence("bugs"), type: "code", style: "glitch" });
    const debugCommand = () => ({ content: getRandomSentence("debug"), type: "code", style: "glitch" });
    const aboutCommand = () => ({ content: getRandomSentence("about"), type: "text" });
    const musicCommand = () => ({ content: getRandomMusic(), type: "music" });
    const audioCommand = () => ({ content: getCompleteRandomSentence(), type: "audio" });

    const commands: Record<string, () => CommandResult> = {
        "!meme": memeCommand,
        "!memes": memeCommand,
        "!gif": gifCommand,
        "!advice": adviceCommand,
        "!advices": adviceCommand,
        "!compliment": complimentCommand,
        "!joke": jokeCommand,
        "!jokes": jokeCommand,
        "!quote": quoteCommand,
        "!funfact": funfactCommand,
        "!fact": funfactCommand,
        "!bug": bugCommand,
        "!debug": debugCommand,
        "!about": aboutCommand,
        "!audio": audioCommand,
        "!music": musicCommand,
        "!song": musicCommand,
        "!track": musicCommand,
        "!playlist": musicCommand,
        "!album": musicCommand,
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
