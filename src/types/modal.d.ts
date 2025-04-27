import { MessageContent } from "./message.d";

export interface ModalContent extends MessageContent {
    message: string;
    modalId: string;
}
