import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import router from "next/router";

export default function Home() {
  return (
    <>
      <main className="text-color flex min-h-[calc(100vh-64px)] w-full flex-col bg-[url('/background.svg')] px-8 py-12 text-slate-800">
        <div className="min-h-screen bg-cover bg-center">
          <div className="container flex w-full flex-col gap-4 py-4">
            <div className="flex w-full flex-col items-center justify-center">
              <img src="/logo.svg" alt="" className="w-32" />
              <h1 className="scroll-m-20 rounded-full bg-white bg-opacity-50 p-4 text-center text-7xl font-extrabold tracking-tight lg:text-5xl">
                Coincidence
              </h1>
              <h2 className="mt-8 scroll-m-20 text-3xl font-semibold tracking-tight text-slate-700 underline">
                How it works
              </h2>
            </div>
            <div className="flex w-full flex-col items-center">
              <img src="/icon_createprofile.svg" alt="" className="w-52" />
              <img src="/icon_addinterest.svg" alt="" className="w-52" />
              <img src="/icon_coincidencepeople.svg" alt="" className="w-52" />
              <img src="/icon_chatfriends.svg" alt="" className="w-52" />
            </div>
            <Button
              onClick={() => {
                router.push("/profile");
              }}
              className="mx-auto max-w-xl bg-slate-700 text-lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
