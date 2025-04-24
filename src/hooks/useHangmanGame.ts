import { useTranslation } from "react-i18next";
import { GameSession } from "../types/game";
import { useGamesManager } from "./useGamesManager";
import { intents } from "../data/intents";

export function useHangmanGame(gamesManager: ReturnType<typeof useGamesManager>) {
    const { t } = useTranslation();
    const words = intents.nouns;

    return {
        session: (): GameSession => {
            const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
            let attempts = 6;
            const guessed: string[] = [];
            const wrongGuesses: string[] = [];

            const getDisplayWord = () =>
                word
                    .split("")
                    .map((char) => (guessed.includes(char) ? char : "_"))
                    .join(" ");

            const endGameMessage = (result: string) => {
                gamesManager.stopGame();
                return `${result} 🎊\n\n${t("ui.word")}: **${word}**.`;
            };

            const checkGameEnd = () => {
                if (word.split("").every((char) => guessed.includes(char))) {
                    return endGameMessage(`🎉 ${t("game.you_win")}! You legend! 😎`);
                }
                if (attempts <= 0) {
                    return endGameMessage(`💀 ${t("game.i_win")}! Better luck next time, pal. 👻`);
                }
                return null;
            };

            const progressMessage = () =>
                `📝 ${t("hangman.progress")}: ${getDisplayWord()}\n❤️ ${t("hangman.attempts_left")}: ${attempts}\n❌ ${t("hangman.wrong_guesses")}: ${wrongGuesses.join(", ") || "none yet!"}`;

            return {
                type: "hangman",
                handleInput: (input: string) => {
                    input = input.toLowerCase();

                    if (!/^[a-z]+$/.test(input)) {
                        return { content: `🤨 ${t("hangman.prompt")}`, type: "text" };
                    }

                    if (input.length > 1) {
                        if (input === word) {
                            return { content: endGameMessage(`🎉 ${t("game.you_win")}! Nailed it! 🔥`), type: "text" };
                        } else {
                            attempts--;
                            const endMessage = checkGameEnd();
                            if (endMessage) return { content: endMessage, type: "text" };

                            wrongGuesses.push(input);
                            return { content: `🙈 ${t("hangman.wrong_word")} Keep trying!\n\n${progressMessage()}`, type: "text" };
                        }
                    }

                    if (guessed.includes(input) || wrongGuesses.includes(input)) {
                        return { content: `⚠️ ${t("hangman.already_guessed")} ${getDisplayWord()}`, type: "text" };
                    }

                    if (word.includes(input)) {
                        guessed.push(input);
                        return { content: `✅ Good one!\n\n${progressMessage()}`, type: "text" };
                    } else {
                        attempts--;
                        wrongGuesses.push(input);
                        const endMessage = checkGameEnd();
                        if (endMessage) return { content: endMessage, type: "text" };

                        return { content: `❌ Nope! '${input}' isn't in there.\n\n${progressMessage()}`, type: "text" };
                    }
                },
                stop: () => ({ content: `🛑 ${t("hangman.stop")} Game over.`, type: "text" }),
            };
        },
    };
}
