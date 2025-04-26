import { useTranslation } from "react-i18next";
import { GameSession } from "../../types/game";
import { useGamesManager } from "./useGamesManager";
import emojiPhrases from "../../data/emojis-phrases";

export function useEmojiGame(gamesManager: ReturnType<typeof useGamesManager>) {
    const { t } = useTranslation();

    return {
        session: (): GameSession => {
            const phrase = emojiPhrases[Math.floor(Math.random() * emojiPhrases.length)];
            let firstPlay = true;

            const session: GameSession = {
                type: "game_emoji",
                firstPlay: true,
                handleInput: (input: string) => {
                    input = input.toLowerCase();

                    if (firstPlay) {
                        firstPlay = false;
                        return {
                            content: `${t("game_emoji.guess_this")}: ${phrase.q} (${phrase.category})`,
                            type: "text",
                        };
                    }

                    if (input.trim() === "") {
                        return {
                            content: `${t("game_emoji.repeat")}: ${phrase.q} (${phrase.category})`,
                            type: "text",
                        };
                    }

                    if (input === phrase.a) {
                        gamesManager.stopGame();
                        return {
                            content: `${t("game_emoji.you_got_it")} \n**${phrase.a}**! 🏆`,
                            type: "text",
                        };
                    } else {
                        gamesManager.stopGame();
                        return {
                            content: `${t("game_emoji.correct_answer_was")} **${phrase.a}**. \n${t("game_emoji.better_luck")}`,
                            type: "text",
                        };
                    }
                },
                stop: () => ({ content: `${t("game_emoji.stop")}.`, type: "text" }),
            };

            return session;
        },
    };
}

