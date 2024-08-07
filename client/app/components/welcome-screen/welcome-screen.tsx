import CircularLightEffect from "@/components/ui/circular-light-effect";
import Header from "../ui/header";
import Image from "next/image";
import GetStartedNowBtn from "@/components/welcome-screen/get-started-now-btn";

export default function WelcomeScreen() {
  return (
    <>
      <Header />
      <section className="gradient flex flex-1 flex-col items-center justify-center gap-20 overflow-hidden p-4 md:gap-8 md:p-8">
        <section className="relative -mt-20 flex w-full flex-col items-center xl:flex-row xl:gap-4 2xl:px-40">
          <div className="z-10 flex flex-col items-center xl:gap-10">
            <div className="flex flex-col items-center lg:mx-32 lg:px-10 xl:mx-0">
              <h2 className="font-secondary text-2xl font-semibold text-gray-100 lg:text-3xl xl:text-4xl 2xl:text-5xl">
                Welcome to DevSync!
              </h2>
              <p className="py-4 text-center text-gray-100/60 lg:text-xl">
                Your solution for real-time project collaboration. Create and
                join projects, edit code together, and manage your workspace
                with ease. Enhance your teamwork today.
              </p>
            </div>
            <div className="flex gap-4 xl:justify-center">
              <GetStartedNowBtn />
            </div>
          </div>

          <div className="pt-12 xl:py-0">
            <Image
              src="./illustrations/collaboration.svg"
              alt="collaboration"
              width={80}
              height={80}
              className="w-96 lg:w-[30rem] xl:w-[80rem] 2xl:w-[90rem]"
            />
          </div>

          <div className="absolute -top-[30%] left-1/4">
            <CircularLightEffect />
          </div>
        </section>
      </section>
    </>
  );
}
