import { useTranslation } from "react-i18next";
import { useRandom } from "./useRandom";
import { CommandResult } from "../types/command";
import { useRPSGame } from "./useRPSGame";
import { useGamesManager } from "./useGamesManager";
import { useConversation } from "./useConversation";
import { useHangmanGame } from "./useHangmanGame";
import { useQuizGame } from "./useQuizGame";
import { useEmojiGame } from "./useEmojiGame";
import { useGuessNumberGame } from "./useGuessNumberGame";

export function useCommands() {
    const { t } = useTranslation();
    const { handleMessage } = useConversation();
    const { getRandomMeme, getRandomGif, getRandomMusic, getRandomSentence, getCompleteRandomSentence } =
        useRandom();
    const gamesManager = useGamesManager();
    const rpsGame = useRPSGame(gamesManager);
    const hangmanGame = useHangmanGame(gamesManager);
    const quizGame = useQuizGame(gamesManager);
    const emojiGame = useEmojiGame(gamesManager);
    const guessNumberGame = useGuessNumberGame(gamesManager);

    function helpCommand(): CommandResult {
        return {
            content: (t("commands_list", { returnObjects: true }) as string[]).join("\n"),
            type: "code",
            style: "pre",
        };
    }

    function gameCommand(): CommandResult {
        return {
            content: (t("game_list", { returnObjects: true }) as string[]).join("\n"),
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
    const pingCommand = () => ({ content: "🏓 ~ping", type: "text" });
    const pongCommand = () => ({ content: "🏓 ~pong", type: "text" });
    const echoCommand = (message: string) => ({ content: message || t("ui.say_something"), type: "text" });
    const rpsCommand = () => gamesManager.startGame(rpsGame.session());
    const hangmanCommand = () => gamesManager.startGame(hangmanGame.session());
    const quizCommand = () => gamesManager.startGame(quizGame.session());
    const emojiGameCommand = () => gamesManager.startGame(emojiGame.session());
    const guessNumberGameCommand = () => gamesManager.startGame(guessNumberGame.session());

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
        "!help": helpCommand,
        "!commands": helpCommand,
        "!cmds": helpCommand,
        "!game": gameCommand,
        "!games": gameCommand,
        "!ping": pongCommand,
        "!pong": pingCommand,
        "!echo": echoCommand,
        "!rps": rpsCommand,
        "!hangman": hangmanCommand,
        "!quiz": quizCommand,
        "!trivia": quizCommand,
        "!emoji": emojiGameCommand,
        "!emotion": emojiGameCommand,
        "!guessnumber": guessNumberGameCommand,
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
