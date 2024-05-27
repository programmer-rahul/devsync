import Header from "@/app/components/home/header";
import WelcomeScreen from "./components/home/welcome-screen";
import CheckWelcomeScreen from "@/components/home/check-welcome-screen";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />

      <CheckWelcomeScreen>
        <WelcomeScreen />
      </CheckWelcomeScreen>
    </div>
  );
}
