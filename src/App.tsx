import { useState } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { useBot } from "./hooks/useBot";

function App() {
  const { messages, sendUserMessage } = useBot();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendUserMessage(input);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} from={msg.from} content={msg.content} />
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-2 rounded bg-zinc-800 text-white border border-zinc-700"
          placeholder="Digite algo ou use um comando (!meme, !bug...)"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default App;
