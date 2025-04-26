import { useEffect } from "react";
import { MessageType } from "../../types/message";
import { useRandom } from "./useRandom";

export function useWelcome(
    initialized: boolean,
    messageCount: number,
    onBotMessage: (msg: { type: MessageType; content: string }) => void
) {
    const { getRandomSentence } = useRandom();

    useEffect(() => {
        if (!initialized || messageCount > 0) return;
        const randomWelcome = getRandomSentence("welcome");
        onBotMessage({ type: "info", content: randomWelcome });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized, messageCount]);
}
