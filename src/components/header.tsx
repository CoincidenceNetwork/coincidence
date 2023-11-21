import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";

function shortenAddress(address: string, length: number = 8): string {
  const prefixLength = Math.floor(length / 2);
  const suffixLength = length - prefixLength;
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
}

const Header = () => {
  const { open, close } = useWeb3Modal();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  return (
    <header className={`left-0 top-0 z-10 bg-background shadow-md`}>
      <nav className="flex items-center justify-between px-4 py-4 text-slate-800">
        <Link href="/" className="flex flex-row items-center gap-2">
          <img src="/logo.svg" alt="" className="w-8" />
          <div className="text-xl font-bold">Coincidence</div>
        </Link>
        <div className="flex flex-row items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                {isConnected ? shortenAddress(address!) : "Connect"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect Wallet</DialogTitle>
                <DialogDescription>
                  Choose between Metamask or WalletConnect to connect your
                  wallet.
                </DialogDescription>
              </DialogHeader>
              <div className="flex w-full flex-col items-center gap-4">
                <MetaMaskButton
                  theme={"light"}
                  color="white"
                  text={isConnected ? shortenAddress(address!) : "Metamask"}
                />
                <Button
                  onClick={() => {
                    open();
                  }}
                >
                  {isConnected ? shortenAddress(address!) : "WalletConnect"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
};

export default Header;
