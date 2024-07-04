import CreateProjectBtn from "@/components/home-screen/create-project";
import JoinProjectBtn from "@/components/home-screen/join-project";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="relative flex w-full items-center justify-between px-8 py-2 lg:px-8">
      <Logo />
      <div>
        <div className="flex gap-2">
          <CreateProjectBtn />
          <JoinProjectBtn />
        </div>
      </div>
    </header>
  );
}
