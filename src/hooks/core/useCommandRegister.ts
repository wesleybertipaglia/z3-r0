import { useEffect } from "react";
import { useQuizGame } from "../game/useQuizGame";
import { commandService } from "../../services/command.service";
import { gamesManager } from "../../services/game.service";

export function useCommandRegister() {
    const quizGame = useQuizGame(gamesManager);

    useEffect(() => {
        commandService.registerCommand(["!quiz", "!trivia"], () => {
            return gamesManager.startGame(quizGame.session());
        });
    }, [quizGame]);
}