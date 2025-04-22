import { useState, useRef } from "react";
import { useMessage } from "./useMessage";
import { useCommands } from "./useCommands";
import { useSound } from "./useSound";
import { MessageType } from "../types/message";
import { useWelcome } from "./useWelcome";
import { useInactivity } from "./useInactivity";
import { useConversation } from "./useConversation";

let msgId = 0;

export function useBot() {
    const { messages, addMessage, initialized, randomMessage } = useMessage();
    const { resolveCommand } = useCommands();
    const { play } = useSound();
    const [isTyping, setIsTyping] = useState(false);
    const lastInteractionRef = useRef(Date.now());
    const { analyzeMessage } = useConversation();

    // 👋 Welcome logic
    useWelcome(initialized, messages.length, onBotMessage);

    // 💤 Inactivity logic
    useInactivity(initialized, lastInteractionRef, randomMessage);

    // 💬 User message logic
    function onUserMessage(text: string) {
        lastInteractionRef.current = Date.now();

        addMessage({ id: msgId++, from: "user", content: text });

        const commandResult = resolveCommand(text.trim());

        if (commandResult) {
            onBotMessage({ type: commandResult.type ?? "text", content: commandResult.content });
        } else {
            const conversationReply = analyzeMessage(text);
            onBotMessage({ type: "text", content: conversationReply });
        }
    }

    // 🤖 Bot message logic
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
