import { type AppType } from "next/dist/shared/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import BottomNavigation from "@/components/bottom-navigation";
import ClientOnly from "@/components/client-only";
import { useEffect, useState } from "react";
import { LightNode } from "@waku/sdk";
import { createNode } from "@/lib/wakunet/waku";
import { Web3Modal } from "@/context/Web3Modal";
import Home from ".";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

export const metadata = {
  title: "Coincidence",
  description: "Coincidence",
};

const Coincidence: AppType = ({ Component, pageProps, router }) => {
  const [wakuNode, setWakuNode] = useState<LightNode | null>(null);
  useEffect(() => {
    if (wakuNode) return;
    (async () => {
      const node = await createNode();
      setWakuNode(node);
    })();
  }, []);

  // If wakuNode is not loaded and we're on the index route, render the index page
  if (!wakuNode && router.route === "/") {
    return <Home />;
  } else if (!wakuNode) {
    // If wakuNode is not loaded, show loading for node
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading Waku Network...
      </div>
    );
  }
  return (
    <ClientOnly>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Web3Modal>
          <MetaMaskUIProvider
            sdkOptions={{
              dappMetadata: {
                name: "Coincidence",
              },
            }}
          >
            <Component {...pageProps} wakuNode={wakuNode} />
          </MetaMaskUIProvider>
        </Web3Modal>
        <Toaster />
        <BottomNavigation></BottomNavigation>
      </ThemeProvider>
    </ClientOnly>
  );
};

export default Coincidence;
