import JoinProjectBtn from "@/components/home/join-project";
import Logo from "./logo";
import CreateProjectBtn from "@/components/home/create-project";

export default function WelcomeScreen() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-20 overflow-hidden bg-[#101820] p-4 md:gap-8 md:p-8">
      <section className="-mt-20 flex w-full flex-col items-center xl:flex-row xl:gap-4 2xl:px-40">
        
        <div className="flex flex-col items-center xl:gap-10">
          <div className="flex flex-col items-center lg:mx-32 xl:mx-0 lg:px-10">
            <h2 className="text-2xl text-gray-100 lg:text-3xl xl:text-4xl 2xl:text-5xl">
              Welcome to DevSync!
            </h2>
            <p className="py-4 text-center text-gray-100/60 lg:text-xl">
              Your solution for real-time project collaboration. Create and join
              projects, edit code together, and manage your workspace with ease.
              Enhance your teamwork today.
            </p>
          </div>
          <div className="flex gap-4 xl:justify-center">
            <CreateProjectBtn />
            <JoinProjectBtn />
          </div>
        </div>

        <div className="pt-12 xl:py-0">
          <img
            src="./illustrations/collaboration.svg"
            alt="collaboration"
            className="w-96 lg:w-[30rem] xl:w-[80rem] 2xl:w-[90rem]"
          />
        </div>

      </section>
    </main>
  );
}
