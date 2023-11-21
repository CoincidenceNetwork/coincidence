import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const scrollToBottom = () => {
    scrollTo({ top: 2000, behavior: "smooth" });
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
      <main className="flex w-full flex-col px-8 py-4">
        <div className="flex-grow overflow-y-auto px-4 pb-2 pt-2">
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
          </div>
        </div>
        <form className="bottom-0 left-0 flex w-full items-center border-t bg-background px-4 pt-2">
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mr-2 flex-grow rounded-full bg-gray-100 px-3 py-2 focus:outline-none"
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            className="flex h-10 w-10 items-center justify-center rounded-full"
          >
            Send
          </Button>
        </form>
      </main>
      <BottomNavigation />
    </>
  );
};

interface Message {
  text: string;
  sender: "user" | "other";
}

export default App;
