import { useState } from "react";
import Message from "./components/Message";
import { useBot } from "./hooks/useBot";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import TypingIndicator from "./components/TypingIndicator";

function App() {
  const { messages, sendUserMessage, isTyping } = useBot();
  const [input, setInput] = useState("");
  const { t } = useTranslation();
  const placeholders: string[] = t("placeholders", { returnObjects: true }) as string[];
  const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];

  const handleSend = () => {
    if (!input.trim()) return;
    sendUserMessage(input);
    setInput("");
  };

  return (
    <div className="h-screen max-h-screen bg-neutral-900 text-blue-50 flex">
      <div className="w-full flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2 container max-w-2xl mx-auto py-4 px-6">
            {messages.map((msg) => (
              <Message key={msg.id} from={msg.from} content={msg.content} />
            ))}
          </div>

          <div className="flex flex-col gap-2 container max-w-2xl mx-auto py-4 px-6">
            {isTyping && <TypingIndicator />}
          </div>
        </main>

        <footer className="border-t border-neutral-800">
          <div className="flex flex-col gap-1 container max-w-2xl mx-auto py-4 px-6 shadow">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 p-2 rounded bg-neutral-800 border border-neutral-700"
              placeholder={randomPlaceholder}
            />

            <p>
              <small>
                {t("ui.developed")}{" "}
                <a href="https://wesleybertipaglia.github.io/" target="_blank" className="text-blue-400 hover:underline">
                  <strong>@wesleybertipaglia</strong>
                </a>
              </small>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
