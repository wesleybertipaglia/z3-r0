export type From = "user" | "bot";

export const messageTypes = [
    "text",
    "code",
    "quote",
    "link",
    "html",
    "component",
    "image",
    "audio",
    "music",
    "video",
    "file"
];

export const messageStyles = [
    "glitch",
    "pre",
    "code",
    "error",
    "warning",
    "success",
    "info",
    "quote"
];

export type MessageType = (typeof messageTypes)[number];

export type MessageStyle = (typeof messageStyles)[number];

export type MessageDto = {
    id: number;
    from: From;
    type?: MessageType;
    style?: MessageStyle;
    content: string | React.FC;
};
