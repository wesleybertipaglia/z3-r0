import { useTranslation } from "react-i18next";
import gifs from "../data/gifs";
import memes from "../data/memes";
import musics from "../data/musics";
import { MessageType, messageTypes } from "../types/message.d";

export function useRandom() {
    const { t } = useTranslation();

    function getRandomMeme() {
        return memes[Math.floor(Math.random() * memes.length)];
    }

    function getRandomGif() {
        return gifs[Math.floor(Math.random() * gifs.length)];
    }

    function getRandomMusic() {
        return musics[Math.floor(Math.random() * musics.length)];
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

    return { getRandomMeme, getRandomGif, getRandomMusic, getRandomSentence, getCompleteRandomSentence, getRandomType };
}
