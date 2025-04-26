import { useTranslation } from "react-i18next";
import { GameSession } from "../../types/game";
import { useGamesManager } from "./useGamesManager";

export function useGuessNumberGame(gamesManager: ReturnType<typeof useGamesManager>) {
    const { t } = useTranslation();

    return {
        session: (maxNumber: number = 50, maxAttempts: number = 10): GameSession => {
            const secret = Math.floor(Math.random() * maxNumber) + 1;
            let attempts = 0;
            let firstPlay = true;

            const session: GameSession = {
                type: "game_guessnumber",
                firstPlay: true,
                handleInput: (input: string) => {
                    if (firstPlay) {
                        firstPlay = false;
                        return {
                            content: `🎲 ${t("game_guessnumber.start")} (1-${maxNumber})\n${t("game_guessnumber.max_attempts")}: ${maxAttempts}`,
                            type: "text",
                        };
                    }

                    const guess = parseInt(input, 10);
                    if (isNaN(guess) || guess < 1 || guess > maxNumber) {
                        return {
                            content: `❌ ${t("game_guessnumber.invalid_input")} (1-${maxNumber})`,
                            type: "text",
                        };
                    }

                    attempts++;

                    if (guess === secret) {
                        gamesManager.stopGame();
                        return {
                            content: `🎉 ${t("game_guessnumber.correct")} **${secret}**! ${t("game_guessnumber.attempts")}: ${attempts} 🔥`,
                            type: "text",
                        };
                    }

                    if (attempts >= maxAttempts) {
                        gamesManager.stopGame();
                        return {
                            content: `💀 ${t("game_guessnumber.no_attempts_left")} ${t("game_guessnumber.answer_was")}: **${secret}**`,
                            type: "text",
                        };
                    }

                    const hint = guess > secret ? t("game_guessnumber.higher") : t("game_guessnumber.lower");
                    return {
                        content: `🔍 ${hint} ${t("game_guessnumber.attempts")}: ${attempts}/${maxAttempts}`,
                        type: "text",
                    };
                },
                stop: () => ({ content: `🛑 ${t("game_guessnumber.stop")} Game over.`, type: "text" }),
            };

            return session;
        },
    };
}
