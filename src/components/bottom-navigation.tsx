import { Book, Link, MessageCircle } from "lucide-react";
import React from "react";

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around bg-background  py-2">
      <a href="#" className="flex flex-col items-center">
        <MessageCircle />
        <span className="text-xs">Chat</span>
      </a>
      <a href="#" className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <Link />
        </svg>
        <span className="text-xs">Connect</span>
      </a>
      <a href="#" className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <Book />
        </svg>
        <span className="text-xs">Learn</span>
      </a>
    </nav>
  );
};

export default BottomNavigation;
