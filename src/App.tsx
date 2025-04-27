import { useRef, useState } from "react";
import { useBot } from "./hooks/core/useBot";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Feed from "./components/Feed";
import { scrollToBottom } from "./utils/scroll.util";

function App() {
  const { messages, onUserMessage: sendUserMessage, isTyping } = useBot();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    sendUserMessage(input);
    setInput("");
  };

  return (
    <div className="h-dvh max-h-screen bg-neutral-900 text-blue-50 flex">
      <div className="w-full flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <Feed
            messages={messages}
            isTyping={isTyping}
            bottomRef={bottomRef}
          />
        </main>

        <Footer
          input={input}
          setInput={setInput}
          onSend={handleSend}
          onScrollToBottom={() => scrollToBottom(bottomRef)}
        />
      </div>
    </div>
  );
}

export default App;
