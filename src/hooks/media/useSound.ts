import { useState, useEffect } from "react";

export function useSound(): { play: (name: string) => void; loaded: boolean } {
    const [loaded, setLoaded] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const newAudio = new Audio("/assets/sounds/pop.mp3");
        newAudio.addEventListener("canplaythrough", () => {
            setLoaded(true);
        });

        newAudio.load();

        setAudio(newAudio);

        return () => {
            newAudio.remove();
        };
    }, []);

    const play = (): void => {
        if (!audio) return;
        audio.currentTime = 0;
        audio.play().catch((e) => console.error("Failed to play sound:", e));
    };

    return { play, loaded };
}
