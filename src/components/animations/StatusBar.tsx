import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const StatusBar = () => {
    const { t } = useTranslation();
    const [phrase, setPhrase] = useState("");

    useEffect(() => {
        const status = t("status", { returnObjects: true }) as string[];

        const randomPhrase = () =>
            status[Math.floor(Math.random() * status.length)];

        setPhrase(randomPhrase());

        const interval = setInterval(() => {
            setPhrase(randomPhrase());
        }, 10000);

        return () => clearInterval(interval);
    }, [t]);

    return (
        <p className="text-center text-xs text-gray-400 mt-1 border-t border-neutral-800 animate-pulse">
            {phrase}
        </p>
    );
}

export default StatusBar