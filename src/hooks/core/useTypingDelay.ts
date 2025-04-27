export function useDelay() {
    const MIN_DELAY = 50;
    const MAX_DELAY = 1000;

    const getDelay = (content: string) => {
        const baseDelay = content.length * 50;
        return Math.max(MIN_DELAY, Math.min(MAX_DELAY, baseDelay));
    };

    return { getDelay };
}