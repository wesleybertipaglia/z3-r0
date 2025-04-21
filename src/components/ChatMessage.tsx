import React from "react";

type Props = {
    from: "user" | "bot";
    content: string;
};

export const ChatMessage: React.FC<Props> = ({ from, content }) => {
    const isUser = from === "user";
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
            <div className={`p-3 rounded-xl max-w-[70%] ${isUser ? "bg-purple-500 text-white" : "bg-green-100 text-black"}`}>
                {content}
            </div>
        </div>
    );
};
