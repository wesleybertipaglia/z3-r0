export type GameSession = {
    type: string;
    handleInput: (input: string) => CommandResult;
    stop?: () => CommandResult;
};