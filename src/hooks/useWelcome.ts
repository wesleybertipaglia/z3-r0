import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MessageType } from "../types/message";

export function useWelcome(
    initialized: boolean,
    messageCount: number,
    onBotMessage: (msg: { type: MessageType; content: string }) => void
) {
    const { t } = useTranslation();

    useEffect(() => {
        if (!initialized || messageCount > 0) return;

        const welcomeMessages = t("welcome", { returnObjects: true }) as string[];
        const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

        onBotMessage({ type: "info", content: randomWelcome });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized, messageCount, t]);
}
