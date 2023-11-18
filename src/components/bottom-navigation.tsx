import { Book, Link, MessageCircle, Smile } from "lucide-react";
import React from "react";

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-background py-2">
      <a href="/profile" className="flex flex-col items-center">
        <Smile />
        <span className="text-xs">Profile</span>
      </a>
      <a href="/connect" className="flex flex-col items-center">
        <Link />
        <span className="text-xs">Connect</span>
      </a>
      <a href="/chat" className="flex flex-col items-center">
        <MessageCircle />
        <span className="text-xs">Chat</span>
      </a>
      <a href="/learn" className="flex flex-col items-center">
        <Book />
        <span className="text-xs">Learn</span>
      </a>
    </nav>
  );
};

export default BottomNavigation;
