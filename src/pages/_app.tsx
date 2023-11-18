import { type AppType } from "next/dist/shared/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

import "@/styles/globals.css";
import BottomNavigation from "@/components/bottom-navigation";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Component {...pageProps} />
      <Toaster />
      <BottomNavigation></BottomNavigation>
    </ThemeProvider>
  );
};

export default MyApp;
