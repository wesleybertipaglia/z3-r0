import { useCallback } from "react";

export function useConversation() {
    const greetings = ["hello", "hi", "hey", "yo"];
    const goodbyes = ["bye", "goodbye", "see ya", "later"];
    const questions = ["?", "what", "why", "how", "when"];
    const excitement = ["!", "awesome", "cool", "great"];
    const feelings = ["sad", "happy", "tired", "bored"];
    const emojis = [
        "😊", "😢", "😎", "😴", "😒", "🫣",
        "😳", "😱", "🥲", "🤗", "🤔", "😏",
        "😬", "😅", "😆", "🤣", "😂", "😜",
        "😝", "😛", "🤪", "🤑", "🤭", "🤫",
        "🤥", "🤓", "🧐", "😎", "🥸", "😺",
        "🙀", "😻", "😼", "😽", "🙈", "🙉",
        "🙊", "💖", "💰", "🦆", "🚀", "🐙",
        "🐉", "🐲", "🦄", "🦋", "🐌", "🐞",
        "🎁", "🎉", "✨", "🎊", "🏅", "🎈",
        "🎂", "🍰", "🍦", "🍩", "🍪", "🍫",
        "🍬", "🍭", "🍮", "🍯", "🍰", "🍨",
    ];
    const laughs = ["haha", "lol", "lmao", "rofl", "kkk", "xd"];

    const responses = {
        greeting: ["Hey there!", "Hello! 😊", "Hi friend!", "Yo!"],
        goodbye: ["Catch you later!", "Bye 👋", "Talk soon!", "Peace out!"],
        question: ["That's a good question...", "Let me think... 🤔", "Hmm, interesting.", "I'd say..."],
        excitement: ["Haha, love that energy!", "Wooo! 🎉", "Hyped! 😎"],
        feeling: ["Wanna talk about it?", "I'm here for you 💖", "Sounds like a vibe!", "Tell me more!"],
        laughs: ["Haha, that's funny!", "LOL 😂", "You made me laugh!", "Haha, good one!"],
        default: ["Tell me more!", "I’m listening...", "Go on..."]
    };

    const analyzeMessage = useCallback((text: string): string => {
        const normalized = text.toLowerCase();

        const matchedResponses: string[] = [];

        if (greetings.some(word => normalized.includes(word))) {
            matchedResponses.push(randomFrom(responses.greeting));
        }

        if (goodbyes.some(word => normalized.includes(word))) {
            matchedResponses.push(randomFrom(responses.goodbye));
        }

        if (questions.some(word => normalized.includes(word))) {
            matchedResponses.push(randomFrom(responses.question));
        }

        if (excitement.some(word => normalized.includes(word))) {
            matchedResponses.push(randomFrom(responses.excitement));
        }

        if (feelings.some(word => normalized.includes(word))) {
            matchedResponses.push(randomFrom(responses.feeling));
        }

        if (emojis.some(word => normalized.includes(word))) {
            matchedResponses.push(randomFrom(emojis));
        }

        if (laughs.some(word => normalized.includes(word))) {
            matchedResponses.push(randomFrom(responses.laughs));
        }

        if (matchedResponses.length === 0) {
            matchedResponses.push(randomFrom(responses.default));
        }

        return matchedResponses.join(" ");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { analyzeMessage };
}

function randomFrom(array: string[]) {
    return array[Math.floor(Math.random() * array.length)];
}
