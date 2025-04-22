export type From = "user" | "bot";
export type MessageType = "text" | "image" | "glitch" | "pre" | "code" | "text" | "error" | "warning" | "success" | "info" | "audio" | "html"
export type ContentType = string | ReactElement | null;

export type MessageDto = {
    id: number;
    from: From;
    type?: MessageType;
    content: ContentType;
};