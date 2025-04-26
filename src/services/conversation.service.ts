import { intents } from "../data/intents";
import { responses } from "../data/responses";
import { t } from "i18next";

export class ConversationService {
    analyzeMessage(text: string): string {
        const normalized = text.toLowerCase();
        const matchedResponses: string[] = [];

        Object.keys(intents).forEach((intent) => {
            if (this.matchesCategory(normalized, intents[intent as keyof typeof intents])) {
                const possibleResponses = responses[intent as keyof typeof responses] || [];
                if (possibleResponses.length > 0) {
                    matchedResponses.push(this.randomFrom(possibleResponses));
                }
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
        if (!array || array.length === 0) return t("not_understood");
        return array[Math.floor(Math.random() * array.length)];
    }
}
