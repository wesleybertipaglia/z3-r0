import { useState, useRef } from "react";
import { useMessage } from "../message/useMessage";
import { useSound } from "../media/useSound";
import { useWelcome } from "../message/useWelcome";
import { useInactivity } from "./useInactivity";
import { useCommandRegister } from "../command/useCommandRegister";
import { useMessageRouter } from "../message/useMessageRouter";
import { CommandResult } from "../../types/command";

export function useBot() {
    const { messages, send, initialized, sendRandomMessage } = useMessage();
    const { play } = useSound();
    const [isTyping, setIsTyping] = useState(false);
    const lastInteractionRef = useRef(Date.now());
    const { resolve } = useMessageRouter();

    // 👋 Welcome logic
    useWelcome(initialized, messages.length, onBotMessage);

    // 💤 Inactivity logic
    useInactivity(initialized, lastInteractionRef, sendRandomMessage);

    // ✅ Regerister commands
    useCommandRegister();

    // 💬 User message logic
    function onUserMessage(text: string) {
        lastInteractionRef.current = Date.now();
        send({ from: "user", content: text });

        const result = resolve(text.trim());
        onBotMessage(result);
    }

    // 🤖 Bot message logic
    function onBotMessage({ content, type, style }: CommandResult) {
        setIsTyping(true);

        setTimeout(() => {
            send({ from: "bot", content, type, style });
            setIsTyping(false);
            play("pop.mp3");
        }, 1200);
    }

    return { messages, onUserMessage, isTyping };
}
