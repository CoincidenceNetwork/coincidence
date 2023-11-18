import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className=" flex min-h-[calc(100vh-64px)] w-full flex-col">
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
      </main>
    </>
  );
}
