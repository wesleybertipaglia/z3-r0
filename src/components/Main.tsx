import { MessageDto } from '../types/message'
import Message from './Message'
import TypingIndicator from './TypingIndicator'

interface Props {
    messages: MessageDto[],
    isTyping: boolean
}

const Main = ({ messages, isTyping }: Props) => {
    return (
        <main className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-2 container max-w-2xl mx-auto py-4 px-6">
                {messages.map((msg) => (
                    <Message key={msg.id} {...msg} />
                ))}
            </div>

            <div className="flex flex-col gap-2 container max-w-2xl mx-auto py-4 px-6">
                {isTyping && <TypingIndicator />}
            </div>
        </main>
    )
}

export default Main