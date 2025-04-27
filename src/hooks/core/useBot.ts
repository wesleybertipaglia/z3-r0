import { useState, useRef, useEffect } from "react";
import { useMessage } from "../message/useMessage";
import { useSound } from "../media/useSound";
import { useCommandRegister } from "../command/useCommandRegister";
import { useMessageRouter } from "../message/useMessageRouter";
import { useDelay } from "./useTypingDelay";
import { CommandResult } from "../../types/command";

export function useBot() {
    const { messages, send } = useMessage();
    const { play, loaded } = useSound();
    const [isTyping, setIsTyping] = useState(false);
    const lastInteractionRef = useRef(Date.now());
    const { resolve } = useMessageRouter();
    const { getDelay } = useDelay();
    const [commandResult, setCommandResult] = useState<CommandResult | null>(null);    

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
    }, [commandResult, loaded]);

    // 🤖 Bot message handler
    async function onBotMessage({ content, type, style }: CommandResult) {
        setIsTyping(true);
        const delay = getDelay(content);
        await new Promise((resolve) => setTimeout(resolve, delay));
        send({ from: "bot", content, type, style });
        setIsTyping(false);
        await new Promise((resolve) => setTimeout(resolve, 100));        
        play("pop.mp3");
    }

    return { messages, onUserMessage, isTyping };
}
