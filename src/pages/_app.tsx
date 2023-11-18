import { type AppType } from "next/dist/shared/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

import "@/styles/globals.css";
import BottomNavigation from "@/components/bottom-navigation";
import ClientOnly from "@/components/client-only";
import { useEffect, useState } from "react";
import { LightNode } from "@waku/sdk";
import { createNode } from "@/lib/wakunet/waku";

const Coincidence: AppType = ({ Component, pageProps }) => {
  // useEffect(() => {
  //   localStorage.setItem("debug", "waku*"); // TBD unsure if this works
  // }, []);

  const [wakuNode, setWakuNode] = useState<LightNode | null>(null);
  useEffect(() => {
    if (wakuNode) return;
    (async () => {
      const node = await createNode();
      setWakuNode(node);
    })();
  }, [wakuNode]);

  if (!wakuNode) {
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
        <Component {...pageProps} wakuNode={wakuNode} />
        <Toaster />
        <BottomNavigation></BottomNavigation>
      </ThemeProvider>
    </ClientOnly>
  );
};

export default Coincidence;
