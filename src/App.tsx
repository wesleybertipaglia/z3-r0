import { useRef, useState } from "react";
import { useBot } from "./hooks/core/useBot";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Feed from "./components/layout/Feed";
import { scrollToBottom } from "./utils/scroll.util";
import { useInViewport } from "./hooks/core/useInViewport";

function App() {
  const { messages, onUserMessage: sendUserMessage, isTyping } = useBot();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const bottomInViewport = useInViewport(bottomRef, 0.5);

  const handleSend = () => {
    if (!input.trim()) return;
    sendUserMessage(input);
    setInput("");
  };

  return (
    <div className="h-dvh max-h-screen bg-neutral-900 text-blue-50 flex">
      <div className="w-full flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto py-4 px-6">
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
          bottomInViewport={bottomInViewport}
        />
      </div>
    </div>
  );
}

export default App;
