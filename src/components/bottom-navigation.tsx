import Link from "next/link";

const BottomNavigation = () => {
  return (
    <div className="bottom-0 left-0 box-border flex max-w-full items-center justify-around border-t bg-background py-3 bg-blend-color shadow-sm">
      <Link href="/profile" className="flex flex-col items-center">
        <img src="/settings_icon.svg" alt="" className="w-8" />
        <span className="text-md">Profile</span>
      </Link>
      <Link href="/connect" className="flex flex-col items-center">
        <img src="/connect_icon.svg" alt="" className="w-8" />
        <span className="text-md">Connect</span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center">
        <img src="/chat_icon.svg" alt="" className="w-8" />
        <span className="text-md">Chat</span>
      </Link>
      <Link href="/learn" className="flex flex-col items-center">
        <img src="/learn_icon.svg" alt="" className="w-8" />
        <span className="text-md">Learn</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
