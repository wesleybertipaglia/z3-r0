import { useTranslation } from "react-i18next";
import { GameSession } from "../../types/game";
import { useGamesManager } from "./useGamesManager";
import { intents } from "../../data/intents";

export function useWordScrambleGame(gamesManager: ReturnType<typeof useGamesManager>) {
    const { t } = useTranslation();
    const words = intents.nouns;

    // Helper: Shuffle characters of a word
    const scrambleWord = (word: string): string => {
        return word
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("")
            .toUpperCase();
    };

    return {
        session: (maxAttempts: number = 5): GameSession => {
            const originalWord = words[Math.floor(Math.random() * words.length)];
            const scrambledWord = scrambleWord(originalWord);
            let attempts = 0;
            let firstPlay = true;

            const session: GameSession = {
                type: "word_scramble",
                firstPlay: true,
                handleInput: (input: string) => {
                    if (firstPlay) {
                        firstPlay = false;
                        return {
                            content: `🔀 ${t("game_scramble.scrambled")}: **${scrambledWord}**\n${t("game_scramble.max_attempts")}: ${maxAttempts}`,
                            type: "text",
                        };
                    }

                    const guess = input.trim().toLowerCase();
                    attempts++;

                    if (guess === originalWord) {
                        gamesManager.stopGame();
                        return {
                            content: `🎉 ${t("game_scramble.correct")} **${originalWord.toUpperCase()}**! ${t("game_scramble.attempts")}: ${attempts}`,
                            type: "text",
                        };
                    }

                    if (attempts >= maxAttempts) {
                        gamesManager.stopGame();
                        return {
                            content: `💀 ${t("game_scramble.no_attempts_left")} ${t("game_scramble.answer_was")}: **${originalWord.toUpperCase()}**`,
                            type: "text",
                        };
                    }

                    return {
                        content: `❌ ${t("game_scramble.try_again")} (${t("game_scramble.attempts")}: ${attempts}/${maxAttempts})`,
                        type: "text",
                    };
                },
                stop: () => ({ content: `🛑 ${t("game_scramble.stop")}`, type: "text" }),
            };

            return session;
        },
    };
}
