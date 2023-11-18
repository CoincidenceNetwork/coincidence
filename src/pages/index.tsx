import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col bg-[url('/background.svg')] px-8 py-20">
        <div className="min-h-screen bg-cover bg-center">
          {/* The content of your app */}
          <div className="container flex w-full flex-col gap-4 py-4">
            <div className="flex w-full flex-col items-center justify-center">
              <img src="/logo.svg" alt="" className="w-32" />
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                WELCOME TO COINCIDENCE!
              </h1>
              <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                How it works
              </h2>
            </div>
            <div className="flex w-full flex-col items-center">
              <img src="/icon_createprofile.svg" alt="" className="w-52" />
              <img src="/icon_addinterest.svg" alt="" className="w-52" />
              <img src="/icon_coincidencepeople.svg" alt="" className="w-52" />
              <img src="/icon_chatfriends.svg" alt="" className="w-52" />
              {/* <p>its p2p. its private</p> */}
            </div>
            <Button
              onClick={() => {
                alert("hello");
                console.log("Hello");
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
