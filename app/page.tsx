import CheckWelcomeScreen from "@/components/client/home/check-welcome-screen";
import Header from "@/components/home/header";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />

      <CheckWelcomeScreen />
    </div>
  );
}
