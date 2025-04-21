import gifs from "../media/gif_gallery";
import memes from "../media/meme_gallery";

export function useMedia() {
    function randomMeme() {
        return memes[Math.floor(Math.random() * memes.length)];
    }

    function randomGif() {
        return gifs[Math.floor(Math.random() * gifs.length)];
    }

    return { randomMeme, randomGif };
}
