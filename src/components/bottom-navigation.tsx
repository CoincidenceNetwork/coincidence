import Link from "next/link";

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-background py-2">
      <Link href="/profile" className="flex flex-col items-center">
        <img src="/settings_icon.svg" alt="" className="w-8" />
        <span className="text-xs">Profile</span>
      </Link>
      <Link href="/connect" className="flex flex-col items-center">
        <img src="/connect_icon.svg" alt="" className="w-8" />
        <span className="text-xs">Connect</span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center">
        <img src="/chat_icon.svg" alt="" className="w-8" />
        <span className="text-xs">Chat</span>
      </Link>
      <Link href="/learn" className="flex flex-col items-center">
        <img src="/learn_icon.svg" alt="" className="w-8" />
        <span className="text-xs">Learn</span>
      </Link>
    </nav>
  );
};

export default BottomNavigation;
