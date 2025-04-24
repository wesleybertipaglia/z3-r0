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
                type: "quiz",
                firstPlay: true,
                handleInput: function (input: string) {
                    // Check if it's the first play
                    if (this.firstPlay) {
                        this.firstPlay = false;
                        return { content: `🤔 ${t("quiz.question")}: **${question.q}**`, type: "text" };
                    }

                    // If the answer is empty or invalid, repeat the question
                    const normalizedInput = input.trim().toLowerCase();
                    if (normalizedInput === "") {
                        return { content: `❓ ${t("quiz.question")}: **${question.q}**`, type: "text" };
                    }

                    // Check the answer and stop the game if answered
                    const isCorrect = normalizedInput === question.a;
                    gamesManager.stopGame();

                    return {
                        content: isCorrect
                            ? `🎉 ${t("quiz.you_got_it")} 🏆`
                            : `❌ ${t("quiz.correct_answer_was")} **${question.a}**. ${t("quiz.better_luck")} 🧐`,
                        type: "text",
                    };
                },
                stop: () => ({ content: `🛑 ${t("quiz.stop")}`, type: "text" }),
            };
        },
    };
}
