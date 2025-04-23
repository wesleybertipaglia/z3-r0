import { ContentType, MessageType, MessageStyle } from "./message";

export type CommandResult = {
    content: ContentType;
    type?: MessageType;
    style?: MessageStyle;
};