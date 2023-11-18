const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-background py-2">
      <a href="/profile" className="flex flex-col items-center">
      <img src="/settings_icon.svg" alt="" className="w-8" />
        <span className="text-xs">Profile</span>
      </a>
      <a href="/connect" className="flex flex-col items-center">
      <img src="/connect_icon.svg" alt="" className="w-8" />
        <span className="text-xs">Connect</span>
      </a>
      <a href="/chat" className="flex flex-col items-center">
        <img src="/chat_icon.svg" alt="" className="w-8" />
        <span className="text-xs">Chat</span>
      </a>
      <a href="/learn" className="flex flex-col items-center">
      <img src="/learn_icon.svg" alt="" className="w-8" />
        <span className="text-xs">Learn</span>
      </a>
    </nav>
  );
};

export default BottomNavigation;
