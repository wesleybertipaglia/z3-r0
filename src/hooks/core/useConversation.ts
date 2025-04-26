import { useCallback } from "react";
import { ConversationService } from "../../services/conversation.service";

const conversationService = new ConversationService();

export function useConversation() {
    const handleMessage = useCallback((text: string): string => {
        return conversationService.analyzeMessage(text);
    }, []);

    return { handleMessage };
}
