import { useState, useRef } from "react";
import { useMessage } from "./useMessage";
import { useCommands } from "./useCommands";
import { useSound } from "./useSound";
import { MessageType } from "../types/message";
import { useWelcome } from "./useWelcome";
import { useInactivity } from "./useInactivity";

let msgId = 0;

export function useBot() {
    const { messages, addMessage, initialized, randomMessage } = useMessage();
    const { resolveCommand } = useCommands();
    const { play } = useSound();
    const [isTyping, setIsTyping] = useState(false);
    const lastInteractionRef = useRef(Date.now());

    // 👋 Welcome logic
    useWelcome(initialized, messages.length, onBotMessage);

    // 💤 Inactivity logic
    useInactivity(initialized, lastInteractionRef, randomMessage);

    function onUserMessage(text: string) {
        lastInteractionRef.current = Date.now();
        addMessage({ id: msgId++, from: "user", content: text });

        const response = resolveCommand(text.trim());
        onBotMessage({ type: response.type as MessageType, content: response.content });
    }

    function onBotMessage({ type, content }: { type: MessageType; content: string }) {
        setIsTyping(true);
        setTimeout(() => {
            addMessage({ id: msgId++, from: "bot", content, type });
            setIsTyping(false);
            play("pop.mp3");
        }, 1200);
    }

    return { messages, onUserMessage, isTyping };
}
