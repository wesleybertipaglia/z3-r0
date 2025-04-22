
export function useSound() {
    const play = (name: string) => {
        const audio = new Audio(`/assets/sounds/${name}`);
        audio.currentTime = 0;
        audio.play().catch(e => {
            console.error("Failed to play sound:", e);
        });
    };

    return { play };
}
