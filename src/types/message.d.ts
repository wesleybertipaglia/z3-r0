export type From = "user" | "bot";
export type MessageType = "text" | "image" | "glitch";
export type ContentType = string | ReactElement | null;

export type MessageDto = {
    id: number;
    from: From;
    type?: MessageType;
    content: ContentType;
};