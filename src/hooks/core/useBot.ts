import { useState, useRef } from "react";
import { useMessage } from "../message/useMessage";
import { useSound } from "../media/useSound";
import { MessageType } from "../../types/message";
import { useWelcome } from "../message/useWelcome";
import { useInactivity } from "./useInactivity";
import { useCommandRegister } from "../command/useCommandRegister";
import { useMessageRouter } from "../message/useMessageRouter";

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
        onBotMessage({ type: result.type ?? "text", content: result.content });
    }

    // 🤖 Bot message logic
    function onBotMessage({ type, content }: { type: MessageType; content: string }) {
        setIsTyping(true);

        setTimeout(() => {
            send({ from: "bot", content, type });
            setIsTyping(false);
            play("pop.mp3");
        }, 1200);
    }

    return { messages, onUserMessage, isTyping };
}
