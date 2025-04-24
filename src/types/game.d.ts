export type GameSession = {
    type: string;
    firstPlay: boolean;
    handleInput: (input: string) => CommandResult;
    stop?: () => CommandResult;
};