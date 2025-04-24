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
            let answered = false;

            const getResultMessage = (correct: boolean) => {
                gamesManager.stopGame();
                return correct
                    ? `🎉 ${t("quiz.you_got_it")} 🏆`
                    : `❌ ${t("quiz.correct_answer_was")} **${question.a}**. ${t("quiz.better_luck")} 🧐`;
            };

            return {
                type: "quiz",
                handleInput: (input: string) => {
                    if (input == "")
                        return { content: `🤔 ${t("quiz.question")}: **${question.q}**`, type: "text" };

                    if (answered) {
                        return { content: `📚 ${t("quiz.already_answered")}`, type: "text" };
                    }

                    const normalizedInput = input.trim().toLowerCase();
                    if (normalizedInput === "") {
                        return { content: `❓ ${t("quiz.question")}: **${question.q}**`, type: "text" };
                    }

                    answered = true;
                    const isCorrect = normalizedInput === question.a;
                    return { content: getResultMessage(isCorrect), type: "text" };
                },
                stop: () => ({ content: `🛑 ${t("quiz.stop")}`, type: "text" }),
            };
        },
    };
}
