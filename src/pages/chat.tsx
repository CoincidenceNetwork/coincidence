import Header from "@/components/header";
import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      setInput("");
    }
  };

  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20">
        <div className="flex-grow overflow-y-auto px-4 pt-72 pb-8">
          <div className="flex flex-col space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-center rounded-lg px-3 py-2 shadow ${
                    message.sender === "user"
                      ? "self-end bg-green-500 text-white"
                      : "self-start bg-white text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form className="fixed bottom-0 left-0 flex w-full items-center border-t bg-background px-4 pb-16 pt-2">
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mr-2 flex-grow rounded-full bg-gray-100 px-3 py-2 focus:outline-none"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white"
          >
            Send
          </button>
        </form>
      </main>
    </>
  );
};

interface Message {
  text: string;
  sender: "user" | "other";
}

export default App;
