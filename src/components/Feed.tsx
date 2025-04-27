import { useEffect } from 'react';
import { MessageDto } from '../types/message';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import { scrollToBottom } from '../utils/scroll.util';

interface Props {
    messages: MessageDto[]
    isTyping: boolean
    bottomRef: React.RefObject<HTMLDivElement | null>
}

const Feed = ({ messages, isTyping, bottomRef }: Props) => {
    useEffect(() => {
        scrollToBottom(bottomRef);
    }, [messages]);

    return (
        <div className="flex flex-col gap-2 container max-w-2xl mx-auto">
            {messages.map((msg) => (
                <Message key={msg.id} {...msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
        </div>
    );
};

export default Feed;
