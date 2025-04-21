import { useState } from "react";
import { useBot } from "./hooks/useBot";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  const { messages, onUserMessage: sendUserMessage, isTyping } = useBot();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendUserMessage(input);
    setInput("");
  };

  return (
    <div className="h-dvh max-h-screen bg-neutral-900 text-blue-50 flex">
      <div className="w-full flex flex-col flex-1 overflow-hidden">
        <Header />

        <Main
          messages={messages}
          isTyping={isTyping}
        />

        <Footer
          input={input}
          setInput={setInput}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}

export default App;
