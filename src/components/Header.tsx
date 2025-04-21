import { LanguageSwitcher } from "./LanguageSwitcher"

const Header = () => {
    return (
        <header className="border-b border-neutral-800">
            <div className="flex flex-col gap-2 container max-w-2xl mx-auto py-4 px-6">
                <nav className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2">
                        <p className="text-2xl">🤖</p>
                        <div>
                            <h1 className="text-sm font-bold">Z3-R0</h1>
                            <p className="text-xs text-gray-400 border-t">Chatbot</p>
                        </div>
                    </div>

                    <div>
                        <LanguageSwitcher />
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header