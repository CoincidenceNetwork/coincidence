import { User } from "lucide-react";
import Link from "next/link";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";

function shortenAddress(address: string, length: number = 4): string {
  const prefixLength = Math.floor(length / 2);
  const suffixLength = length - prefixLength;
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
}

const Header = () => {
  const { open, close } = useWeb3Modal();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  return (
    <header
      className={`fixed left-0 top-0 z-10 w-full bg-background shadow-md`}
    >
      <nav className="flex items-center justify-between px-4 py-4">
        <Link href="/">
          <div className="font-bold">Coincidence</div>
        </Link>
        <div className="flex flex-row items-center gap-2">
          <Link href="/profile">
            <User />
          </Link>
          <Button
            onClick={() => {
              open();
            }}
          >
            {isConnected ? shortenAddress(address!) : "Connect"}
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
