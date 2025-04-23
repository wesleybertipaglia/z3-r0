import { intents } from "../data/intents";
import { responses } from "../data/responses";

export class ConversationService {
    analyzeMessage(text: string): string {
        const normalized = text.toLowerCase();
        const matchedResponses: string[] = [];

        Object.keys(intents).forEach((intent) => {
            if (this.matchesCategory(normalized, intents[intent as keyof typeof intents])) {
                matchedResponses.push(this.randomFrom(responses[intent as keyof typeof responses]));
            }
        });

        if (matchedResponses.length === 0) {
            matchedResponses.push(this.randomFrom(responses.default));
        }

        return matchedResponses.join(" ");
    }

    private matchesCategory(normalized: string, category: string[]): boolean {
        return category.some((word) => normalized.includes(word.toLowerCase()));
    }

    private randomFrom(array: string[]): string {
        return array[Math.floor(Math.random() * array.length)];
    }
}
