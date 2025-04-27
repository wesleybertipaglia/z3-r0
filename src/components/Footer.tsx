import { useTranslation } from 'react-i18next'

interface Props {
    input: string
    setInput: (value: string) => void
    onSend: () => void
    onScrollToBottom: () => void;
}

const Footer = ({ input, setInput, onSend, onScrollToBottom }: Props) => {
    const { t } = useTranslation();
    const placeholders: string[] = t("placeholders", { returnObjects: true }) as string[];
    const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];

    return (
        <footer className="border-t border-neutral-800 py-4 px-6">
            <div className="flex flex-col gap-1 container max-w-2xl mx-auto shadow relative">
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

                <div className='absolute -top-full right-0'>
                    <button onClick={onScrollToBottom} className="px-4 py-2 rounded-full text-sm cursor-pointer bg-neutral-800 hover:bg-neutral-900 border border-neutral-700">
                        New Messages
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer