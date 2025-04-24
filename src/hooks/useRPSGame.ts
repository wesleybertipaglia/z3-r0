import { useTranslation } from "react-i18next";
import { GameSession } from "../types/game";
import { useGamesManager } from "./useGamesManager";

export function useRPSGame(gamesManager: ReturnType<typeof useGamesManager>) {
    const { t } = useTranslation();

    const choices = [t("rps.rock"), t("rps.paper"), t("rps.scissors")];
    const winMap: Record<string, string> = {
        [t("rps.rock")]: t("rps.scissors"),
        [t("rps.paper")]: t("rps.rock"),
        [t("rps.scissors")]: t("rps.paper"),
    };

    return {
        session: (): GameSession => ({
            type: "rps",
            handleInput: (input: string) => {
                input = input.toLowerCase();
                if (!choices.includes(input)) {
                    return { content: t("rps.welcome"), type: "text" };
                }

                const botMove = choices[Math.floor(Math.random() * choices.length)];
                let result = `${t("ui.you")}: ${input}, ${t("ui.me")}: ${botMove}. `;

                if (input === botMove) {
                    result += `${t("game.draw")}! 🙂‍↕️`;
                } else if (winMap[input] === botMove) {
                    result += `${t("ui.you")} ${t("game.you_win")}! 🥳`;
                } else {
                    result += `${t("ui.i")} ${t("game.i_win")}! 😜`;
                }

                gamesManager.stopGame();
                return { content: result, type: "text" };
            },
            stop: () => ({ content: t("rps.stop"), type: "text" }),
        }),
    };
}
