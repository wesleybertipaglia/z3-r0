import { useTranslation } from "react-i18next";

const TypingIndicator = () => {
    const { t } = useTranslation();

    return (
        <div className="animate-pulse text-sm text-gray-400 ml-3"> {t("ui.typing")}</div>
    )
}

export default TypingIndicator