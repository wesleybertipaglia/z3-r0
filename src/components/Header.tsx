import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher"
import StatusBar from "./StatusBar";

const Header = () => {
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() < 0.25) {
                setIsOnline(true);
                setTimeout(() => setIsOnline(false), 4000);
            }
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="border-b border-neutral-800 shadow-lg">
            <div className="flex flex-col gap-2 container max-w-2xl mx-auto py-4 px-6">
                <nav className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-4">
                        <div className="relative">
                            <img src="/profile.jpg" alt="Z3-R0" className="h-10 w-10 rounded-full" loading='lazy' />
                            {isOnline && (
                                <span className="absolute -top-0 -right-1 w-1 h-1 rounded-full bg-green-500 animate-ping"></span>
                            )}
                            <span className="absolute -top-0 -right-1 w-1 h-1 rounded-full bg-green-500 opacity-50" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold">Z3-R0</h1>
                            <StatusBar />
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