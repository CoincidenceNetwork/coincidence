import { User } from "lucide-react";

const Header = () => {
  return (
    <header
      className={`fixed left-0 top-0 z-10 w-full bg-background shadow-md`}
    >
      <nav className="flex items-center justify-between px-4 py-4">
        <div className="font-bold">Coincidence</div>
        <User />
      </nav>
    </header>
  );
};

export default Header;
