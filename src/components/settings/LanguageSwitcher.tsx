import { useLanguage } from "@/hooks/core/useLanguage";

export function LanguageSwitcher() {
    const { language, changeLanguage } = useLanguage();
    const langs = ["en", "pt", "es", "cn", "hi"];

    return (
        <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-neutral-900 text-neutral-50 text-sm px-3 py-1 rounded w-full border border-neutral-800 focus:outline-none focus:ring-2"
        >
            {langs.map((lng) => (
                <option key={lng} value={lng}>
                    {lng.toUpperCase()}
                </option>
            ))}
        </select>
    );
}
