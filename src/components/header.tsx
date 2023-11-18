import { User } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header
      className={`fixed left-0 top-0 z-10 w-full bg-background shadow-md`}
    >
      <nav className="flex items-center justify-between px-4 py-4">
        <Link href="/">
          <div className="font-bold">Coincidence</div>
        </Link>
        <Link href="/profile">
          <User />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
