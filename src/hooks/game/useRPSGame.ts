import { useTranslation } from "react-i18next";
import { GameSession } from "../../types/game";
import { useGamesManager } from "./useGamesManager";

export function useRPSGame(gamesManager: ReturnType<typeof useGamesManager>) {
    const { t } = useTranslation();

    const choices = [t("game_rps.rock"), t("game_rps.paper"), t("game_rps.scissors")];
    const winMap: Record<string, string> = {
        [t("game_rps.rock")]: t("game_rps.scissors"),
        [t("game_rps.paper")]: t("game_rps.rock"),
        [t("game_rps.scissors")]: t("game_rps.paper"),
    };

    return {
        session: (): GameSession => ({
            type: "game_rps",
            firstPlay: true,
            handleInput: function (input: string) {
                input = input.toLowerCase();

                // Check if this is the first play
                if (this.firstPlay) {
                    this.firstPlay = false;
                    return { content: t("game_rps.welcome"), type: "text" };
                }

                // Check if the input is valid
                const botMove = choices[Math.floor(Math.random() * choices.length)];
                let result = `${t("ui.you")}: ${input}, ${t("ui.me")}: ${botMove}. `;

                // Check the winner
                if (input === botMove) {
                    result += `${t("game.draw")}! 🙂‍↕️`;
                } else if (winMap[input] === botMove) {
                    result += `${t("ui.you")} ${t("game.you_win")}! 🥳`;
                } else {
                    result += `${t("ui.i")} ${t("game.i_win")}! 😜`;
                }

                // stop the game
                gamesManager.stopGame();
                return { content: result, type: "text" };
            },
            stop: () => ({ content: t("game_rps.stop"), type: "text" }),
        }),
    };
}
