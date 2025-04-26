import { useEffect } from "react";
import { commandService } from "../services/command.service";
import { gamesManager } from "../services/game.service";
import { CommandFunction, CommandResult } from "../types/command";
import { t } from "i18next";

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

export function listCommands(commands: string): CommandResult {
    return {
        content: t("ui.available_commands") + "\n\n" + (t(commands, { returnObjects: true }) as string[]).join("\n"),
        type: "code",
        style: "pre",
    };
}