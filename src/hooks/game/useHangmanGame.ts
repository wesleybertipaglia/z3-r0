import { useTranslation } from "react-i18next";
import { GameSession } from "../../types/game";
import { useGamesManager } from "./useGamesManager";
import { intents } from "../../data/intents";

export function useHangmanGame(gamesManager: ReturnType<typeof useGamesManager>) {
    const { t } = useTranslation();
    const words = intents.nouns;

    return {
        session: (): GameSession => {
            const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
            let attempts = 6;
            const guessed: string[] = [];
            const wrongGuesses: string[] = [];
            let firstPlay = true;

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
                `📝 ${t("game_hangman.progress")}: ${getDisplayWord()}\n❤️ ${t("game_hangman.attempts_left")}: ${attempts}\n❌ ${t("game_hangman.wrong_guesses")}: ${wrongGuesses.join(", ") || "none yet!"}`;

            const session: GameSession = {
                type: "game_hangman",
                firstPlay: true,
                handleInput: (input: string) => {
                    input = input.toLowerCase();

                    // First play logic
                    if (firstPlay) {
                        firstPlay = false;
                        return { content: `🤔 ${t("game_hangman.prompt")}: ${getDisplayWord()}`, type: "text" };
                    }

                    // Validate input
                    if (!/^[a-z]+$/.test(input)) {
                        return { content: `🤨 ${t("game_hangman.prompt")}`, type: "text" };
                    }

                    // Guessing whole word
                    if (input.length > 1) {
                        if (input === word) {
                            return { content: endGameMessage(`🎉 ${t("game.you_win")}! Nailed it! 🔥`), type: "text" };
                        } else {
                            attempts--;
                            const endMessage = checkGameEnd();
                            if (endMessage) return { content: endMessage, type: "text" };

                            wrongGuesses.push(input);
                            return {
                                content: `🙈 ${t("game_hangman.wrong_word")} Keep trying!\n\n${progressMessage()}`,
                                type: "text",
                            };
                        }
                    }

                    // Check if letter already guessed
                    if (guessed.includes(input) || wrongGuesses.includes(input)) {
                        return { content: `⚠️ ${t("game_hangman.already_guessed")} ${getDisplayWord()}`, type: "text" };
                    }

                    // Correct guess
                    if (word.includes(input)) {
                        guessed.push(input);
                        const endMessage = checkGameEnd();
                        if (endMessage) return { content: endMessage, type: "text" };

                        return { content: `✅ Good one!\n\n${progressMessage()}`, type: "text" };
                    } else {
                        attempts--;
                        wrongGuesses.push(input);
                        const endMessage = checkGameEnd();
                        if (endMessage) return { content: endMessage, type: "text" };

                        return { content: `❌ Nope! '${input}' isn't in there.\n\n${progressMessage()}`, type: "text" };
                    }
                },
                stop: () => ({ content: `🛑 ${t("game_hangman.stop")} Game over.`, type: "text" }),
            };

            return session;
        },
    };
}
