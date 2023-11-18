import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col">
        <div
          className="min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww)` }}
        >
          {/* The content of your app */}
          <div className="container flex w-full flex-col gap-4 py-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Heading
            </h1>
            <Button
              onClick={() => {
                alert("hello");
                console.log("Hello");
              }}
            >
              Hello
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
