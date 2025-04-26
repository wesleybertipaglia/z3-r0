import { GameSession } from "../types/game";

class GamesManager {
    currentGame: GameSession | null = null;

    startGame(session: GameSession) {
        this.currentGame = session;
        return session.handleInput("");
    }

    handleGameInput(input: string) {
        if (!this.currentGame) return { content: "No active game.", type: "text" };
        const result = this.currentGame.handleInput(input);
        return result;
    }

    stopGame() {
        this.currentGame = null;
        return { content: "Game stopped.", type: "text" };
    }
}

export const gamesManager = new GamesManager();
