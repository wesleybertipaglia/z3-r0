import gifs from "../media/gif_gallery";
import memes from "../media/meme_gallery";
import tracks from "../media/track_gallery";

export function useMedia() {
    function randomMeme() {
        return memes[Math.floor(Math.random() * memes.length)];
    }

    function randomGif() {
        return gifs[Math.floor(Math.random() * gifs.length)];
    }

    function randomTrack() {
        return tracks[Math.floor(Math.random() * tracks.length)];
    }

    return { randomMeme, randomGif, randomTrack };
}
