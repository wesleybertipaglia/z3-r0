import { useEffect, useRef } from "react";

export function useInactivity(
    onTrigger: () => void,
    delay: number = 5 * 60 * 1000
) {
    const lastInteractionRef = useRef(Date.now());
    const triggered = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = now - lastInteractionRef.current;
            if (diff >= delay) {
                if (!triggered.current)
                onTrigger();
                lastInteractionRef.current = Date.now();
                triggered.current = true
            }
        }, 5000);

        // Clear the interval on unmount to prevent memory leaks
        return () => clearInterval(interval);
    }, [delay, onTrigger]);
}
