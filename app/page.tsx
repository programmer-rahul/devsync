import Header from "@/components/home/header";
import Logo from "@/components/home/logo";
import { Button } from "@/components/ui/button";

export default function Home() {
  return <div className="h-screen w-full flex flex-col" >
    <Header />

    <main className="flex-1 p-4 flex flex-col gap-20 border-2 border-t-transparent border-emerald-600 md:p-8 md:gap-0 md:justify-between">

      <section className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center lg:mx-32 xl:mx-56 2xl:mx-96">
          <h2 className="text-3xl text-slate-200 lg:text-4xl">Welcome to <Logo /></h2>
          <p className="text-center py-4 lg:text-xl text-slate-200/60">Your go-to platform for real-time project collaboration. Easily work on projects, modify code, and perform CRUD operations on files and folders all within one interface.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="lg">Join Project</Button>
          <Button variant="default" size='lg'>Create Project</Button>
        </div>
      </section>

      <section>
        <div className="preview-animation aspect-video h-full lg:max-h-96 xl:max-h-[30rem] lg:mx-auto 2xl:max-h-[33rem] border-4 rounded-md"></div>
      </section>

    </main>
  </div>
}
