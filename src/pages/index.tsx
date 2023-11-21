import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import router from "next/router";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col bg-[url('/background.svg')] bg-cover bg-center bg-no-repeat py-6 text-slate-800">
        <div className="flex flex-col gap-4 py-6">
          <div className="flex w-full flex-col items-center justify-center">
            <img src="/logo.svg" alt="" className="w-32" />
            <h1 className="scroll-m-20 rounded-full bg-white bg-opacity-50 p-4 text-center text-6xl font-extrabold tracking-tight lg:text-8xl">
              Coincidence
            </h1>
          </div>
          <Button
            onClick={() => {
              router.push("/profile");
            }}
            className="mx-auto my-4 max-w-xl bg-slate-700 p-8 text-4xl"
          >
            Get Started
          </Button>
          <div className="flex flex-col items-center rounded-full bg-white bg-opacity-50 p-4 ">
            <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight text-slate-700">
              How does it work?
            </h2>
            <div className="flex w-full flex-col items-center">
              <img src="/icon_createprofile.svg" alt="" className="w-56" />
              <img src="/icon_addinterest.svg" alt="" className="w-56" />
              <img src="/icon_coincidencepeople.svg" alt="" className="w-56" />
              <img src="/icon_chatfriends.svg" alt="" className="w-56" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
