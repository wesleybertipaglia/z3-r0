import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const langs = ["en", "pt", "es", "cn", "hi"];

    return (
        <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-neutral-800 text-neutral-50 text-sm px-3 py-1 rounded border border-neutral-700 focus:outline-none focus:ring-2"
        >
            {langs.map((lng) => (
                <option key={lng} value={lng}>
                    {lng.toUpperCase()}
                </option>
            ))}
        </select>
    );
}
