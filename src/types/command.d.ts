import { MessageType, MessageStyle } from "./message";

export type CommandResult = {
    content: string;
    type?: MessageType;
    style?: MessageStyle;
};