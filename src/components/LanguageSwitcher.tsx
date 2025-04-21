import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    return (
        <div className="text-sm space-x-2">
            <button onClick={() => i18n.changeLanguage("en")}>🇺🇸 English</button>
            <button onClick={() => i18n.changeLanguage("pt")}>🇧🇷 Português</button>
        </div>
    );
};

export default LanguageSwitcher;