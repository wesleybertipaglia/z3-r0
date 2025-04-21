
export function useSound() {
    const play = (name: string) => {
        const audio = new Audio(`src/assets/sounds/${name}`);
        audio.play().catch(e => {
            console.error("Failed to play sound:", e);
        });
    };

    return { play };
}
