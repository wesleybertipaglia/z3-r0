import { useQuizGame } from "../game/useQuizGame";
import { gamesManager } from "../../services/game.service";
import { useEmojiGame } from "../game/useEmojiGame";
import { useGuessNumberGame } from "../game/useGuessNumberGame";
import { useHangmanGame } from "../game/useHangmanGame";
import { useRPSGame } from "../game/useRPSGame";
import { useWordScrambleGame } from "../game/useWordScrambleGame";
import { useTranslation } from "react-i18next";
import { useRandom } from "../media/useRandom";
import { useCowsay } from "../game/useCowSay";
import { listCommands, registerCommand, useRegisterGameCommand } from "../../utils/command.util";

export function useCommandRegister() {
    const { t } = useTranslation();
    const { getRandomMeme, getRandomGif, getRandomMusic, getRandomLiric, getRandomSentence, getCompleteRandomSentence } = useRandom();

    // 💡 Helper Commands
    registerCommand(["!h", "!help", "!commands", "!command"], () => listCommands("commands_categories.commands"));
    registerCommand(["!f", "!fun", "!funny"], () => listCommands("commands_categories.fun"));
    registerCommand(["!g", "!game", "!games"], () => listCommands("commands_categories.games"));

    // 💬 Conversation Commands
    registerCommand(["!l", "!lore"], () => ({ content: "", type: "lore" }));
    registerCommand(["!about", "!info"], () => ({ content: getRandomSentence("about"), type: "info" }));
    registerCommand(["!bug", "!bugs"], () => ({ content: getRandomSentence("bugs"), type: "text" }));
    registerCommand(["!debug", "!debugs"], () => ({ content: getRandomSentence("debug"), type: "text" }));

    // 😜 Fun Commands
    registerCommand(["!random", "!rand"], () => ({ content: getCompleteRandomSentence(), type: "text" }));
    registerCommand(["!advice", "!advices"], () => ({ content: getRandomSentence("advices"), type: "text" }));
    registerCommand(["!compliment", "!compliments"], () => ({ content: getRandomSentence("compliments"), type: "text" }));
    registerCommand(["!joke", "!jokes"], () => ({ content: getRandomSentence("jokes"), type: "text" }));
    registerCommand(["quote", "!quotes"], () => ({ content: getRandomSentence("quotes"), type: "quote" }));
    registerCommand(["!fact", "!funfact", "!funfacts"], () => ({ content: getRandomSentence("funfacts"), type: "text" }));
    registerCommand(["!cowsay", "!cows", "!moo", "!cow", "!saymoo"], useCowsay);
    registerCommand(["!ping"], () => ({ content: "🏓 ~ping", type: "text" }));
    registerCommand(["!pong"], () => ({ content: "🏓 ~pong", type: "text" }));
    registerCommand(["!e", "!echo", "!say"], (message: string) => { return { content: message || t("ui.say_something"), type: "text" }; });

    // 🖼️ Media Commands
    registerCommand(["!meme", "!memes"], () => ({ content: getRandomMeme(), type: "image" }));
    registerCommand(["!gif", "!gifs"], () => ({ content: getRandomGif(), type: "image" }));
    registerCommand(["!music", "!musics", "!track", "!album", "!playlist"], () => ({ content: getRandomMusic(), type: "music" }));
    registerCommand(["!liric", "!lirics", "!sing"], () => ({ content: getRandomLiric(), type: "audio" }));
    registerCommand(["!audio", "!audios", "!voice", "!speach"], () => ({ content: getCompleteRandomSentence(), type: "audio" }));

    // 🕹️ Gamming Commands                    
    useRegisterGameCommand(["!quiz", "!trivia"], useQuizGame(gamesManager).session);
    useRegisterGameCommand(["!emoji", "!emojigame"], useEmojiGame(gamesManager).session);
    useRegisterGameCommand(["!guess", "!guessnumber"], useGuessNumberGame(gamesManager).session);
    useRegisterGameCommand(["!hangman", "!hangmangame"], useHangmanGame(gamesManager).session);
    useRegisterGameCommand(["!rps", "!rockpaperscissors"], useRPSGame(gamesManager).session);
    useRegisterGameCommand(["!scramble", "!word", "!wordscramble"], useWordScrambleGame(gamesManager).session);
}
