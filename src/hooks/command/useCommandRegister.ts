import { useEffect } from "react";
import { useQuizGame } from "../game/useQuizGame";
import { commandService } from "../../services/command.service";
import { gamesManager } from "../../services/game.service";
import { useEmojiGame } from "../game/useEmojiGame";
import { useGuessNumberGame } from "../game/useGuessNumberGame";
import { useHangmanGame } from "../game/useHangmanGame";
import { useRPSGame } from "../game/useRPSGame";
import { useWordScrambleGame } from "../game/useWordScrambleGame";


export function useCommandRegister() {
    const quizGame = useQuizGame(gamesManager);
    const emojiGame = useEmojiGame(gamesManager);
    const guessNumberGame = useGuessNumberGame(gamesManager);
    const hangmanGame = useHangmanGame(gamesManager);
    const rpsGame = useRPSGame(gamesManager);
    const wordScrambleGame = useWordScrambleGame(gamesManager);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function useRegisterGameCommand(commands: string[], gameSession: () => any) {
        useEffect(() => {
            commandService.registerCommand(commands, () => {
                return gamesManager.startGame(gameSession());
            });
        }, [commands, gameSession]);
    }

    // 🕹️ Gamming Commands
    useRegisterGameCommand(["!quiz", "!trivia"], quizGame.session);
    useRegisterGameCommand(["!emoji", "!emojigame"], emojiGame.session);
    useRegisterGameCommand(["!guess", "!guessnumber"], guessNumberGame.session);
    useRegisterGameCommand(["!hangman", "!hangmangame"], hangmanGame.session);
    useRegisterGameCommand(["!rps", "!rockpaperscissors"], rpsGame.session);
    useRegisterGameCommand(["!word", "!wordscramble"], wordScrambleGame.session);
}
