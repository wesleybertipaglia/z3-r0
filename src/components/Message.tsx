import { useTranslation } from "react-i18next";
import { MessageDto } from "../types/message";
import Audio from "./Audio";
import HtmlMessage from "./HtmlMessage";
import React from "react";
import SpotifyFrame from "./SpotifyFrame";
import LoreCrawl from "./LoreCrawl";

const Message = ({ from, content, type, style }: MessageDto) => {
    const isUser = from === "user";
    const { t } = useTranslation();

    const isSingleEmoji = (text: string) => {
        const emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Presentation})$/u;
        return emojiRegex.test(text);
    };

    const getStyleClass = () => {
        switch (style) {
            case "glitch":
                return "text-amber-500";
            case "pre":
                return "bg-neutral-700 p-2 rounded-md whitespace-pre-wrap";
            case "code":
                return "bg-neutral-700 p-1 rounded-md whitespace-pre-wrap font-mono";
            case "error":
                return "text-red-500";
            case "warning":
                return "text-yellow-500";
            case "success":
                return "text-green-500";
            case "info":
                return "text-blue-500";
            case "quote":
                return "border-l-4 border-neutral-500 pl-4 italic";
            default:
                return "";
        }
    };

    const renderContent = () => {
        if (type === "component" && React.isValidElement(content)) {
            return content;
        }

        switch (type) {
            case "text":
                return <p className={`break-words overflow-hidden text-ellipsis whitespace-pre-wrap ${getStyleClass()}`}>{content as string}</p>;
            case "code":
                return <pre className={`bg-neutral-700 p-2 rounded-md whitespace-pre-wrap ${getStyleClass()}`}>{content as string}</pre>;
            case "quote":
                return <blockquote className={`border-l-4 border-neutral-500 pl-4 italic whitespace-pre-wrap ${getStyleClass()}`}>{content as string}</blockquote>;
            case "link":
                return (
                    <a href={content as string} target="_blank" rel="noopener noreferrer" className={`text-blue-500 ${getStyleClass()}`}>
                        {content as string}
                    </a>
                );
            case "html":
                return <HtmlMessage html={content as string} />;
            case "image":
                return <img src={content as string} alt="Media" className="rounded-md max-w-xs shadow" />;
            case "music":
                return <SpotifyFrame track={content as string} />;
            case "audio":
                return <Audio text={content as string} />;
            case "lore":
                return <LoreCrawl />;
            default:
                return (
                    <p
                        className={`break-words overflow-hidden text-ellipsis ${getStyleClass()} ${isSingleEmoji(content as string) ? "text-4xl" : ""
                            }`}
                    >
                        {content as string}
                    </p>
                );
        }
    };

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2 overflow-hidden`}>
            <div
                className={`space-y-2 ${type !== "lore" ? "w-[70%]" : "w-full"} hover:shadow-md hover:bg-neutral-800/30 transition rounded p-2 ${isUser ? "text-end" : ""}`}>

                <p className={`text-sm ${isUser ? "text-cyan-500" : "text-emerald-500"}`}>
                    {isUser ? t("ui.you") : "Z3-R0"}
                </p>
                {renderContent()}
            </div>
        </div>
    );
};

export default Message;
