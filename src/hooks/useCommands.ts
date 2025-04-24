import { useTranslation } from "react-i18next";
import { useRandom } from "./useRandom";
import { CommandResult } from "../types/command";
import { useRPSGame } from "./useRPSGame";
import { useGamesManager } from "./useGamesManager";
import { useConversation } from "./useConversation";

export function useCommands() {
    const { t } = useTranslation();
    const { handleMessage } = useConversation();
    const { getRandomMeme, getRandomGif, getRandomMusic, getRandomSentence, getCompleteRandomSentence } =
        useRandom();
    const gamesManager = useGamesManager();
    const rpsGame = useRPSGame(gamesManager);

    function help(): CommandResult {
        return {
            content: (t("commands_list", { returnObjects: true }) as string[]).join("\n"),
            type: "code",
            style: "pre",
        };
    }

    // Commands
    const adviceCommand = () => ({ content: getRandomSentence("advices"), type: "text" });
    const complimentCommand = () => ({ content: getRandomSentence("compliments"), type: "text" });
    const jokeCommand = () => ({ content: getRandomSentence("jokes"), type: "text" });
    const quoteCommand = () => ({ content: getRandomSentence("quotes"), type: "quote" });
    const funfactCommand = () => ({ content: getRandomSentence("funfacts"), type: "text" });
    const bugCommand = () => ({ content: getRandomSentence("bugs"), type: "code", style: "glitch" });
    const debugCommand = () => ({ content: getRandomSentence("debug"), type: "code", style: "glitch" });
    const aboutCommand = () => ({ content: getRandomSentence("about"), type: "text" });

    // Media commands
    const memeCommand = () => ({ content: getRandomMeme(), type: "image" });
    const gifCommand = () => ({ content: getRandomGif(), type: "image" });
    const musicCommand = () => ({ content: getRandomMusic(), type: "music" });
    const audioCommand = () => ({ content: getCompleteRandomSentence(), type: "audio" });


    // Game commands
    const pongCommand = () => ({ content: "🏓 ~pong", type: "text" });
    const echoCommand = (message: string) => ({ content: message, type: "text" });
    const rpsCommand = () => gamesManager.startGame(rpsGame.session());

    const commands: Record<string, (...args: string[]) => CommandResult> = {
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
        "!pong": pongCommand,
        "!echo": echoCommand,
        "!rps": rpsCommand,
        "!stop": () => gamesManager.stopGame(),
    };

    function resolveCommand(input: string): CommandResult | undefined {
        const normalized = input.trim().toLowerCase();

        if (gamesManager.currentGame) {
            return gamesManager.handleGameInput(normalized);
        }

        const [command, ...args] = normalized.split(" ");
        const commandFn = commands[command];
        return commandFn ? commandFn(...args) : { content: handleMessage(input), type: "text" };
    }


    return { resolveCommand };
}
