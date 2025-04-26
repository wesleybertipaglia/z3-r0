export type GameSession = {
    type: string;
    firstPlay: boolean;
    handleInput: (input: string) => CommandResult;
    stop?: () => CommandResult;
};

export type GameManager = {
    currentGame: GameSession | null;
    startGame: (session: GameSession) => CommandResult;
    handleGameInput: (input: string) => CommandResult;
    stopGame: () => CommandResult;
};