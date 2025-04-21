import { useTranslation } from "react-i18next";

type Props = {
    from: "user" | "bot";
    content: string;
};

const Message = ({ from, content }: Props) => {
    const isUser = from === "user";
    const { t } = useTranslation();

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2 overflow-hidden`}>
            {
                isUser ? (
                    <div className="space-y-2 w-[50%] text-end">
                        <p className="text-sm text-cyan-500">{t("ui.you")}</p>
                        <p className="break-words overflow-hidden text-ellipsis">{content}</p>
                    </div>
                ) : (
                    <div className="space-y-2 w-[50%]">
                        <p className="text-sm text-emerald-500">Z3-R0</p>
                        <p className="break-words overflow-hidden text-ellipsis">{content}</p>
                    </div>
                )
            }
        </div>
    );
}

export default Message