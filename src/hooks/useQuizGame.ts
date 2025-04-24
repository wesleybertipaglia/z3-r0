import { useTranslation } from "react-i18next";
import { GameSession } from "../types/game";
import { useGamesManager } from "./useGamesManager";
import trivias from "../data/trivias";

export function useQuizGame(gamesManager: ReturnType<typeof useGamesManager>) {
    const { t } = useTranslation();

    const questions = trivias;

    return {
        session: (): GameSession => {
            const question = questions[Math.floor(Math.random() * questions.length)];

            return {
                type: "game_quiz",
                firstPlay: true,
                handleInput: function (input: string) {
                    // Check if it's the first play
                    if (this.firstPlay) {
                        this.firstPlay = false;
                        return { content: `🤔 ${t("game_quiz.question")}: **${question.q}**`, type: "text" };
                    }

                    // If the answer is empty or invalid, repeat the question
                    const normalizedInput = input.trim().toLowerCase();
                    if (normalizedInput === "") {
                        return { content: `❓ ${t("game_quiz.question")}: **${question.q}**`, type: "text" };
                    }

                    // Check the answer and stop the game if answered
                    const isCorrect = normalizedInput === question.a;
                    gamesManager.stopGame();

                    return {
                        content: isCorrect
                            ? `🎉 ${t("game_quiz.you_got_it")} 🏆`
                            : `❌ ${t("game_quiz.correct_answer_was")} **${question.a}**. ${t("game_quiz.better_luck")} 🧐`,
                        type: "text",
                    };
                },
                stop: () => ({ content: `🛑 ${t("game_quiz.stop")}`, type: "text" }),
            };
        },
    };
}
