import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export function useLanguage() {
    const { i18n } = useTranslation();

    useEffect(() => {
        localStorage.setItem("language", i18n.language);
    }, [i18n.language]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
    };

    return { language: i18n.language, changeLanguage };
}
