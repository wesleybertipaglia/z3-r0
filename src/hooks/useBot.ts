import { useState } from "react";

type Message = {
    id: number;
    from: "user" | "bot";
    content: string;
    type?: "text" | "image" | "glitch";
};

let msgId = 0;

export function useBot() {
    const [messages, setMessages] = useState<Message[]>([]);

    function sendUserMessage(text: string) {
        addMessage({ from: "user", content: text });
        handleBotResponse(text);
    }

    function addMessage(msg: Omit<Message, "id">) {
        setMessages(prev => [...prev, { id: msgId++, ...msg }]);
    }

    function handleBotResponse(input: string) {
        const resposta = interpretarComando(input.trim());

        setTimeout(() => {
            return addMessage({ from: "bot", ...resposta });
        }, 1000);
    }

    function interpretarComando(input: string) {
        if (!input.startsWith("!")) {
            return { content: "Não entendi, mas tudo bem... 🤖", type: "text" };
        }

        const comandos: Record<string, () => { content: string; type?: "text" | "image" | "glitch" | undefined }> = {
            "!meme": () => ({
                content: "Toma esse meme: 😂",
                type: "image",
            }),
            "!bug": () => ({
                content: "*erro 404 de respeito encontrado* ⚠️",
                type: "glitch",
            }),
            "!conselho": () => ({
                content: "Nunca confie num robô que usa crocs. 👟",
            }),
            "!elogie-me": () => ({
                content: "Você é tão bom que faria até o Clippy se aposentar de orgulho.",
            }),
        };

        return comandos[input]?.() ?? { content: "Comando desconhecido 🤖", type: "text" as "text" };
    }

    return { messages, sendUserMessage };
}
