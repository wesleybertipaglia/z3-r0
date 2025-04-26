import { gamesManager } from "../../services/game.service";
import { CommandResult } from "../../types/command";
import { useCommands } from "../command/useCommands";
import { useConversation } from "./useConversation";

export function useMessageRouter() {
    const { resolveCommand } = useCommands();
    const { handleMessage } = useConversation();

    function resolve(input: string): CommandResult {
        if (gamesManager.currentGame) {
            return gamesManager.handleGameInput(input);
        }

        const commandResult = resolveCommand(input);
        if (commandResult) return commandResult;

        return { content: handleMessage(input), type: "text" };
    }

    return { resolve };
}
