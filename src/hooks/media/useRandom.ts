import { useTranslation } from "react-i18next";
import gifs from "../../data/gifs";
import memes from "../../data/memes";
import musics from "../../data/musics";
import { MessageType, messageTypes } from "../../types/message.d";
import lirics from "../../data/lirics";
import { useMessage } from "../message/useMessage";

export function useRandom() {
    const { t } = useTranslation();
    const { send } = useMessage();

    function getRandomMeme() {
        return memes[Math.floor(Math.random() * memes.length)];
    }

    function getRandomGif() {
        return gifs[Math.floor(Math.random() * gifs.length)];
    }

    function getRandomMusic() {
        return musics[Math.floor(Math.random() * musics.length)];
    }

    function getRandomLiric() {
        return lirics[Math.floor(Math.random() * lirics.length)];
    }

    function getRandomSentence(key: string): string {
        const items = t(key, { returnObjects: true }) as string[] | undefined;
        return items ? items[Math.floor(Math.random() * items.length)] : "";
    }

    function getCompleteRandomSentence(): string {
        const sentenceKeys = ["random", "advices", "jokes", "compliments", "funfacts", "quotes", "bugs", "debug", "about"];
        const randomKey =
            sentenceKeys[Math.floor(Math.random() * sentenceKeys.length)];
        return getRandomSentence(randomKey);
    }

    function getRandomType(): MessageType {
        return messageTypes[Math.floor(Math.random() * messageTypes.length)];
    }

    // 🧩 Random Message Logic
    function sendRandomMessage() {
        const randomType = getRandomType();

        switch (randomType) {
            case "text":
                send({ from: "bot", content: getCompleteRandomSentence(), type: "text" });
                break;
            case "image": {
                const gifOrMeme = Math.random() < 0.5 ? getRandomMeme() : getRandomGif();
                send({ from: "bot", content: gifOrMeme, type: "image" });
                break;
            }
            case "audio":
                send({ from: "bot", content: getCompleteRandomSentence(), type: "audio" });
                break;
            case "music":
                send({ from: "bot", content: getRandomMusic(), type: "music" });
                break;
            default:
                send({ from: "bot", content: getCompleteRandomSentence(), type: "text" });
                break;
        }
    }

    return {
        sendRandomMessage,
        getRandomMeme,
        getRandomGif,
        getRandomMusic,
        getRandomLiric,
        getRandomSentence,
        getCompleteRandomSentence,
        getRandomType
    };
}
