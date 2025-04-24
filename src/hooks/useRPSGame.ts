import { GameSession } from "../types/game";
import { useGamesManager } from "./useGamesManager";

export function useRPSGame(gamesManager: ReturnType<typeof useGamesManager>) {
    return {
        session: (): GameSession => ({
            type: "rps",
            handleInput: (input: string) => {
                const choices = ["rock", "paper", "scissors"];
                if (!choices.includes(input)) {
                    return { content: "🎮 Rock, Paper, or Scissors? Type your move!", type: "text" };
                }

                const botMove = choices[Math.floor(Math.random() * 3)];
                let result = `You: ${input}, Me: ${botMove}. `;

                if (input === botMove) {
                    result += "Draw!";
                    return { content: result, type: "text" };
                }

                const playerWins =
                    (input === "rock" && botMove === "scissors") ||
                    (input === "paper" && botMove === "rock") ||
                    (input === "scissors" && botMove === "paper");

                if (playerWins) {
                    result += "You win!";
                } else {
                    result += "I win!";
                }

                gamesManager.stopGame();

                return { content: result, type: "text" };
            },
            stop: () => ({ content: "Rock Paper Scissors stopped.", type: "text" }),
        }),
    };
}
