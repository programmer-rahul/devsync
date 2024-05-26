import Header from "@/components/home/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return <div className="h-screen w-full border flex flex-col" >
    <Header />

    <main className="flex-1">
      <section className="border px-60 flex h-full items-center">
        <div className="flex gap-8">
          <div>
            <Image src={'welcome-icon.svg'} width={20} height={20} alt="welcome-icon" className="w-full" />
          </div>
          <div className="flex flex-col gap-8 border">
            <div>
              <h2 className="text-2xl text-slate-200">Welcome to <b>DevSync</b></h2>
              <p className="text-justify py-2">Your go-to platform for real-time project collaboration. Easily work on projects, modify code, and perform CRUD operations on files and folders all within one interface.</p>
            </div>
            <div>
              <Button variant='default'>Create Project</Button>
              <Button variant="outline">Join Project</Button>
            </div>
          </div></div>
      </section>
    </main>

    <footer className="border w-full bg-emerald-400 p-8"></footer>
  </div>
}
