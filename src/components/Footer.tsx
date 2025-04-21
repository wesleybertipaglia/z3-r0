import { useTranslation } from 'react-i18next'

interface Props {
    input: string
    setInput: (value: string) => void
    onSend: () => void
}

const Footer = ({ input, setInput, onSend }: Props) => {
    const { t } = useTranslation();
    const placeholders: string[] = t("placeholders", { returnObjects: true }) as string[];
    const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];

    return (
        <footer className="border-t border-neutral-800">
            <div className="flex flex-col gap-1 container max-w-2xl mx-auto py-4 px-6 shadow">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSend()}
                    className="flex-1 p-2 rounded bg-neutral-800 border border-neutral-700"
                    placeholder={randomPlaceholder}
                />

                <p>
                    <small>
                        {t("ui.developed")}{" "}
                        <a href="https://wesleybertipaglia.github.io/" target="_blank" className="text-blue-400 hover:underline">
                            <strong>@wesleybertipaglia</strong>
                        </a>
                    </small>
                </p>
            </div>
        </footer>
    )
}

export default Footer