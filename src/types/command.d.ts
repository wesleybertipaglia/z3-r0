import { MessageType, MessageStyle } from "./message";

export type CommandResult = {
    content: string;
    type?: MessageType;
    style?: MessageStyle;
};

export type CommandFunction = (...args: string[]) => CommandResult;