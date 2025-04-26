import { useEffect } from "react";
import { commandService } from "../services/command.service";
import { gamesManager } from "../services/game.service";
import { CommandFunction } from "../types/command";

export function registerCommand(commands: string[], fn: CommandFunction) {
    commandService.registerCommand(commands, fn);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRegisterGameCommand(commands: string[], gameSession: () => any) {
    useEffect(() => {
        commandService.registerCommand(commands, () => {
            return gamesManager.startGame(gameSession());
        });
    }, [commands, gameSession]);
}