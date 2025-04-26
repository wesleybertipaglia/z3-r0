import { CommandFunction } from "../types/command";
import { gamesManager } from "./game.service";

class CommandService {
    private commands: Record<string, CommandFunction> = {};

    registerCommand(trigger: string | string[], fn: CommandFunction) {
        const triggers = Array.isArray(trigger) ? trigger : [trigger];
        triggers.forEach(cmd => this.commands[cmd] = fn);
    }

    resolveCommand(input: string) {
        const normalized = input.trim().toLowerCase();

        if (gamesManager.currentGame) {
            return gamesManager.handleGameInput(normalized);
        }

        const [command, ...args] = normalized.split(" ");
        const commandFn = this.commands[command];
        if (commandFn) return commandFn(...args);

        return undefined;
    }
}

export const commandService = new CommandService();
