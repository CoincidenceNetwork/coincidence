import Header from "@/components/header";

const LearnPage = () => {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20">
        <h1 className="mb-4 text-2xl font-bold">Learn about our project</h1>
        <p className="mb-2 text-lg">
          This is a placeholder text. Here we will provide some information
          about our project.
        </p>
        <p className="mb-2 text-lg">Stay tuned for more updates!</p>
      </main>
    </>
  );
};

export default LearnPage;
