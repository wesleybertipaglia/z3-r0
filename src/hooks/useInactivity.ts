import { useEffect } from "react";

export function useInactivity(
    initialized: boolean,
    lastInteraction: React.RefObject<number>,
    onTrigger: () => void,
    delay: number = 2 * 60 * 1000
) {
    useEffect(() => {
        if (!initialized || !lastInteraction.current) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = now - lastInteraction.current!;

            if (diff >= delay) {
                onTrigger();
                lastInteraction.current = Date.now();
            }
        }, 15000);

        return () => clearInterval(interval);
    }, [initialized, onTrigger, delay, lastInteraction]);
}
