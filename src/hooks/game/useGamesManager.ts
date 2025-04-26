import { useState } from "react";
import { CommandResult } from "../../types/command";
import { GameSession } from "../../types/game";

export function useGamesManager() {
    const [currentGame, setCurrentGame] = useState<GameSession | null>(null);

    function startGame(session: GameSession) {
        setCurrentGame(session);
        return session.handleInput("");
    }

    function handleGameInput(input: string): CommandResult {
        if (!currentGame) return { content: "No active game.", type: "text" };
        const result = currentGame.handleInput(input);
        return result;
    }

    function stopGame(): CommandResult {
        setCurrentGame(null);
        return { content: "Game stopped.", type: "text" };
    }

    return { currentGame, startGame, handleGameInput, stopGame };
}
