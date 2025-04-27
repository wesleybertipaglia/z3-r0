import { useState, useRef, useEffect } from "react";
import { useMessage } from "../message/useMessage";
import { useSound } from "../media/useSound";
import { useCommandRegister } from "../command/useCommandRegister";
import { useMessageRouter } from "../message/useMessageRouter";
import { useDelay } from "./useTypingDelay";
import { CommandResult } from "../../types/command";
import { useInactivity } from "./useInactivity";
import { useRandom } from "../media/useRandom";
import { useWelcome } from "../message/useWelcome";

export function useBot() {
    const { initialized, messages, send } = useMessage();
    const { play, loaded } = useSound();
    const [isTyping, setIsTyping] = useState(false);
    const lastInteractionRef = useRef(Date.now());
    const { resolve } = useMessageRouter();
    const { getDelay } = useDelay();
    const [commandResult, setCommandResult] = useState<CommandResult | null>(null);
    const { sendRandomMessage } = useRandom();

    // 👋 Welcome message logic
    useWelcome(initialized, messages.length, onBotMessage);

    // 💤 Inactivity message logic
    useInactivity(sendRandomMessage);

    // ✅ Register commands logic
    useCommandRegister();

    // 💬 User message handler
    function onUserMessage(text: string) {
        lastInteractionRef.current = Date.now();
        send({ from: "user", content: text });
        const result = resolve(text.trim());
        setCommandResult(result);
    }

    // 🔄 Command execution effect
    useEffect(() => {
        if (commandResult && loaded) {
            onBotMessage(commandResult);
            setCommandResult(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commandResult, loaded]);

    // 🤖 Bot message handler
    async function onBotMessage({ content, type, style, playSound = true }: CommandResult & { playSound?: boolean }) {
        setIsTyping(true);

        setTimeout(() => {
            send({ from: "bot", content, type, style });
            setIsTyping(false);

            if (playSound) {
                play("pop.mp3");
            }
        }, getDelay(content));
    }

    return { messages, onUserMessage, isTyping };
}
