import { useLanguage } from "@/hooks/core/useLanguage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LanguageSwitcher() {
    const { language, changeLanguage } = useLanguage();
    const langs = ["en", "pt", "es", "cn", "hi"];

    return (
        <Select value={language} onValueChange={changeLanguage}>
            <SelectTrigger className="w-full !bg-transparent hover:bg-neutral-800 border border-neutral-800 rounded">
                <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 border border-neutral-800 text-neutral-50 w-fit text-end cursor-pointer p-2 rounded-md shadow-lg space-y-2">
                {langs.map((lng) => (
                    <SelectItem key={lng} value={lng}>
                        {lng.toUpperCase()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
