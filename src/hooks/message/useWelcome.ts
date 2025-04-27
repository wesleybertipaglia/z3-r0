import { useEffect } from "react";
import { useRandom } from "../media/useRandom";
import { CommandResult } from "../../types/command";

export function useWelcome(
    initialized: boolean,
    messageCount: number,
    onBotMessage: ({ content, type, style, playSound }: CommandResult & { playSound?: boolean }) => void
) {
    const { getRandomSentence } = useRandom();

    useEffect(() => {
        if (!initialized || messageCount > 0) return;
        const randomWelcome = getRandomSentence("welcome");
        onBotMessage({ style: "info", content: randomWelcome, playSound: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized, messageCount]);
}