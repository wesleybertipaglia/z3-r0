import { useTranslation } from 'react-i18next';
import useAudio from '../hooks/media/useAudio';

interface Props {
    text: string;
}

const Audio = ({ text }: Props) => {
    const { isPlaying, speak } = useAudio();
    const { t } = useTranslation();
    const estimateDuration = (text: string) => {
        const words = text.trim().split(/\s+/).length;
        const seconds = Math.ceil(words / 2.5);
        const min = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const sec = (seconds % 60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    };

    return (
        <div className="flex items-start gap-4 bg-zinc-800 text-white rounded-2xl p-3 max-w-xs shadow-sm cursor-pointer" onClick={() => speak(text)}>
            <div className='relative'>
                <img
                    src="/profile.jpg"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    loading='lazy' />
                <button className="absolute -bottom-1 -right-1 shadow">
                    {isPlaying ? "⏹️" : "▶️"}
                </button>
            </div>
            <div className="flex flex-col justify-center">
                <span className="text-sm font-medium">{t("ui.audio")}</span>
                <small className="text-xs text-zinc-400">{estimateDuration(text)}</small>
            </div>
        </div >
    );
}

export default Audio