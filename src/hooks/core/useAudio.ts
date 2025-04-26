import { useState, useCallback } from "react";

const useAudio = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const speak = useCallback((text: string) => {
        if (!text) return;

        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = navigator.language || "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        speechSynthesis.speak(utterance);
    }, []);

    return { isPlaying, speak };
};

export default useAudio;
