import { useEffect, useRef } from 'react';
import { MessageDto } from '../types/message';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

interface Props {
    messages: MessageDto[];
    isTyping: boolean;
}

const Feed = ({ messages, isTyping }: Props) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col gap-2 container max-w-2xl mx-auto py-4 px-6">
            {messages.map((msg) => (
                <Message key={msg.id} {...msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
        </div>
    );
};

export default Feed;
