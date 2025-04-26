import { commandService } from "../../services/command.service";
import { CommandFunction } from "../../types/command";

export function useCommands() {
    function registerCommand(trigger: string | string[], fn: CommandFunction) {
        commandService.registerCommand(trigger, fn);
    }

    function resolveCommand(input: string) {
        return commandService.resolveCommand(input);
    }

    return { registerCommand, resolveCommand };
}