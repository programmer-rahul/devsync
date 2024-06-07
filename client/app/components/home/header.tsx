import CreateProjectBtn from "@/components/home/create-project";
import Logo from "./logo";
import JoinProjectBtn from "@/components/home/join-project";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between p-2 lg:px-8">
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
