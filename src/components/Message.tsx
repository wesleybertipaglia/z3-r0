import { useTranslation } from "react-i18next";
import { MessageDto } from "../types/message";

const Message = ({ from, content, type }: MessageDto) => {
    const isUser = from === "user";
    const { t } = useTranslation();

    const renderContent = () => {
        switch (type) {
            case "text":
                return <p className="break-words overflow-hidden text-ellipsis">{content}</p>;
            case "glitch":
                return <p className="text-red-500">{content}</p>;
            case "pre":
                return <pre className="bg-gray-800 p-2 rounded-md whitespace-pre-wrap">{content}</pre>;
            case "code":
                return <code className="bg-gray-800 p-1 rounded-md whitespace-pre-wrap">{content}</code>;
            case "error":
                return <p className="text-red-500">{content}</p>;
            case "warning":
                return <p className="text-yellow-500">{content}</p>;
            case "success":
                return <p className="text-green-500">{content}</p>;
            case "info":
                return <p className="text-blue-500">{content}</p>;
            case "image":
                return <img src={content as string} alt="Media" className="rounded-md max-w-xs shadow" />;
            default:
                return <p className="break-words overflow-hidden text-ellipsis">{content}</p>;
        }
    };

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2 overflow-hidden`}>
            <div className={`space-y-2 w-[70%] ${isUser ? "text-end" : ""}`}>
                <p className={`text-sm ${isUser ? "text-cyan-500" : "text-emerald-500"}`}>
                    {isUser ? t("ui.you") : "Z3-R0"}
                </p>
                {renderContent()}
            </div>
        </div>
    );
};

export default Message;
