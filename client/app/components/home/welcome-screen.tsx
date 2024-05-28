import JoinProjectBtn from "@/components/home/join-project";
import Logo from "./logo";
import CreateProjectBtn from "@/components/home/create-project";

export default function WelcomeScreen() {
  return (
    <main className="flex flex-1 flex-col gap-20 border-2 border-emerald-600 border-t-transparent p-4 md:justify-between md:gap-0 md:p-8">
      <section className="flex w-full flex-col items-center">
        <div className="flex flex-col items-center lg:mx-32 xl:mx-56 2xl:mx-96 ">
          <h2 className="text-xl text-slate-200 lg:text-2xl">
            Welcome to <Logo />
          </h2>
          <p className="py-4 text-center text-slate-200/60 lg:text-xl">
            Your go-to platform for real-time project collaboration. Easily work
            on projects, modify code, and perform CRUD operations on files and
            folders all within one interface.
          </p>
        </div>
        <div className="flex gap-4">
          <JoinProjectBtn />
          <CreateProjectBtn />
        </div>
      </section>

      <section>
        <div className="preview-animation aspect-video h-full rounded-md border-4 lg:mx-auto lg:max-h-96 xl:max-h-[30rem] 2xl:max-h-[33rem]"></div>
      </section>
    </main>
  );
}
