import { useLanguage } from "../hooks/useLanguage";

export function LanguageSwitcher() {
    const { language, changeLanguage } = useLanguage();
    const langs = ["en", "pt", "es", "cn", "hi"];

    return (
        <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
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
