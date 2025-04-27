import { MessageType, MessageStyle, MessageContent } from "./message";

export type CommandResult = {
    content: MessageContent | string;
    type?: MessageType;
    style?: MessageStyle;
};

export type CommandFunction = (...args: string[]) => CommandResult;